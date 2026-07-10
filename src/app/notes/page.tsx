import { NotesListContent } from "@/components/notes-list-content";

const NOTES = [
  {
    title: "夏日午后的咖啡馆",
    date: "Jul 09, 2026",
    description:
      "窗外蝉鸣不止，手边的冰美式慢慢化开。这一刻的安静，值得记下来。",
    slug: "summer-afternoon-cafe",
  },
  {
    title: "读《人类简史》有感",
    date: "Jul 05, 2026",
    description:
      "从认知革命到农业革命，再到科学革命，人类的每一步都充满了偶然与必然。",
    slug: "reading-sapiens",
  },
  {
    title: "周末爬山记",
    date: "Jul 01, 2026",
    description:
      "清晨六点出发，山顶的风吹散了所有的疲惫。下山的路上，夕阳把影子拉得很长。",
    slug: "weekend-hiking",
  },
];

export default function NotesPage() {
  return <NotesListContent notes={NOTES} />;
}
