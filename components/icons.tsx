import {
  Moon,
  Sun,
  Globe,
  SignIn,
  SignOut,
  CornersOut,
  UserCircle,
  UsersThree,
  Books,
  LockSimple,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  CaretDown,
  CaretRight,
  MagnifyingGlass,
  SlidersHorizontal,
  X,
  List,
  Check,
  CheckCircle,
  Lightbulb,
  Clock,
  Trophy,
  BookOpen,
  Sparkle,
  ArrowCounterClockwise,
  Calculator,
  Shapes,
  Hash,
  Graph,
  Target,
  Compass,
  PencilSimple,
  Play,
  Pause,
  Infinity as InfinityIcon,
  Lightning,
  Eye,
  Info,
  SealCheck,
  EnvelopeSimple,
  TelegramLogo,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
const icons = {
  moon: Moon,
  sun: Sun,
  globe: Globe,
  login: SignIn,
  logout: SignOut,
  fullscreen: CornersOut,
  user: UserCircle,
  users: UsersThree,
  resources: Books,
  lock: LockSimple,
  arrow: ArrowRight,
  external: ArrowUpRight,
  back: ArrowLeft,
  down: CaretDown,
  right: CaretRight,
  search: MagnifyingGlass,
  filter: SlidersHorizontal,
  close: X,
  menu: List,
  check: Check,
  success: CheckCircle,
  hint: Lightbulb,
  clock: Clock,
  trophy: Trophy,
  book: BookOpen,
  sparkle: Sparkle,
  reset: ArrowCounterClockwise,
  algebra: Calculator,
  geometry: Shapes,
  numbers: Hash,
  combinatorics: Graph,
  target: Target,
  compass: Compass,
  pencil: PencilSimple,
  play: Play,
  pause: Pause,
  infinity: InfinityIcon,
  bolt: Lightning,
  eye: Eye,
  info: Info,
  seal: SealCheck,
  email: EnvelopeSimple,
  telegram: TelegramLogo,
  trash: Trash,
};
export type IconName = keyof typeof icons;
export default function Icon({
  name,
  size = 22,
  className = "",
  weight = "regular",
}: {
  name: IconName;
  size?: number;
  className?: string;
  weight?: "regular" | "bold" | "duotone" | "fill";
}) {
  const Component = icons[name];
  return (
    <Component
      size={size}
      className={className}
      weight={weight}
      aria-hidden="true"
    />
  );
}
