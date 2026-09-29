import type { ContentBody } from './platform-types';

export type CardDisplay = { card_display: string; card_display_type: 'math' | 'text' };

const stripDelimiters = (value:string) => value.trim().replace(/^\$\$?|\$\$?$/g,'').trim();
const fitsCard = (value:string) => {
  const raw=stripDelimiters(value);
  if(!raw || raw.length>140 || /\\begin\{|\\(?:substack|overset|underset)\b/.test(raw))return false;
  const visible=raw.replace(/\\(?:left|right|qquad|quad|,|;|!)/g,'').replace(/\\[a-zA-Z]+/g,'x').replace(/[{}_^\\]/g,'');
  return visible.length<=44;
};

export function chooseCardDisplay(data:ContentBody):CardDisplay {
  const preferred=stripDelimiters(data.formula);
  if(fitsCard(preferred))return {card_display:preferred,card_display_type:'math'};
  const candidates=Array.from(data.body.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g),match=>stripDelimiters(match[1]||match[2]||''));
  const selected=candidates.find(fitsCard);
  if(selected)return {card_display:selected,card_display_type:'math'};
  const prose=data.body.replace(/\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g,' ').replace(/[#*_`>]/g,' ').replace(/\s+/g,' ').trim();
  const excerpt=(prose.match(/^.{12,68}?(?=[.!?]|$)/)?.[0]||prose.slice(0,64)||'Yangi masala').trim();
  return {card_display:excerpt+(prose.length>excerpt.length?'…':''),card_display_type:'text'};
}
