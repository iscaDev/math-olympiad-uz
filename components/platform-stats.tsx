import Icon, { type IconName } from "./icons";
import { T } from "./preferences";
import {api} from '@/lib/api';
export default async function PlatformStats(){
const counts=await api<{users:number;tests:number;problems:number;resources:number}>('/api/public/stats');
const stats:{label:string;value:number;unit?:string;detail:string;icon:IconName}[]=[
{label:'Foydalanuvchilar',value:counts.users,detail:'Ro‘yxatdan o‘tgan hisoblar',icon:'users'},
{label:'Testlar',value:counts.tests,detail:'Nashr etilgan testlar',icon:'trophy'},
{label:'Masalalar',value:counts.problems,detail:'Algebra, geometriya va boshqalar',icon:'pencil'},
{label:'O‘quv resurslari',value:counts.resources,detail:'Mavzular, maqolalar va kitoblar',icon:'resources'}];
  return (
    <section className="platform-stats" aria-labelledby="platform-stats-title">
      <div className="stats-heading">
        <h2 id="platform-stats-title">
          <T>{"PLATFORMA RAQAMLARDA"}</T>
        </h2>
        <span className="stats-preview">
          <span aria-hidden="true" />
          <T>{"Joriy ma’lumotlar"}</T>
        </span>
      </div>
      <dl className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <dt>
              <span className="stat-icon">
                <Icon name={stat.icon} size={21} weight="duotone" />
              </span>
              <T>{stat.label}</T>
            </dt>
            <dd>
              <div className="stat-number-line">
                <span
                  className={`stat-value${stat.value === null ? " stat-pending" : ""}`}
                  aria-hidden={stat.value === null ? true : undefined}
                >
                  {stat.value ?? "—"}
                </span>
                {stat.unit && (
                  <span
                    className={`stat-unit${stat.value === null ? " stat-soon" : ""}`}
                  >
                    <T>{stat.unit}</T>
                  </span>
                )}
              </div>
              <p className="stat-detail">
                <T>{stat.detail}</T>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
