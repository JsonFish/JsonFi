import Tiptap from "@/components/tiptap";
import { NoteBackLink } from "@/components/note-back-link";
import { notFound } from "next/navigation";

const NOTES: Record<string, { title: string; date: string; content: string }> =
  {
    "summer-afternoon-cafe": {
      title: "夏日午后的咖啡馆",
      date: "Jul 09, 2026",
      content: `
      <p>下午三点，阳光从落地窗斜斜地照进来，把木桌烤得温热。</p>
      <p>我点了一杯冰美式，坐在角落的位置。窗外蝉鸣不止，像是整个夏天都在合唱。偶尔有人推门进来，带进一股热浪，又很快被空调的凉意吞没。</p>
      <blockquote>所谓幸福，也许就是此刻的安静。</blockquote>
      <p>翻开笔记本，写了三行字，又划掉两行。咖啡从满杯喝到见底，冰块化了大半。时间在这里好像变慢了，慢到可以听见自己的呼吸。</p>
      <p>五点半，起身离开。推开门的瞬间，热浪扑面而来，像是另一个世界。</p>
    `,
    },
    "reading-sapiens": {
      title: "读《人类简史》有感",
      date: "Jul 05, 2026",
      content: `
      <h2>认知革命</h2>
      <p>大约七万年前，智人开始拥有讲述虚构故事的能力。正是这种能力，让大规模的合作成为可能——国家、货币、宗教，本质上都是共同想象的产物。</p>
      <h2>农业革命：是福还是祸？</h2>
      <p>作者赫拉利提出了一个颠覆性的观点：农业革命可能是历史上最大的骗局。小麦驯化了人类，而非人类驯化了小麦。我们为了耕种放弃了游猎的自由，却被土地牢牢拴住。</p>
      <blockquote>"我们从农业革命中学到的最重要的一课：物种演化上的成功并不代表个体的幸福。"</blockquote>
      <h2>科学革命</h2>
      <p>过去五百年，人类承认了自己的无知，开始用科学方法探索世界。这种"无知"的承认，反而成了最强大的武器。</p>
      <p>合上书的那一刻，我在想：下一个七万年，人类会走向哪里？</p>
    `,
    },
    "weekend-hiking": {
      title: "周末爬山记",
      date: "Jul 01, 2026",
      content: `
      <p>清晨六点，闹钟响起。天还没完全亮，我已经背上行囊出了门。</p>
      <h3>上山</h3>
      <p>前半段路是石阶，走得还算轻松。过了半山腰，路变得陡峭起来。汗水顺着背脊往下淌，腿像灌了铅一样沉。每走五十步，就停下来喘口气，抬头看看还有多远。</p>
      <blockquote>山不在高，有坚持则能登顶。</blockquote>
      <h3>登顶</h3>
      <p>九点十五分，终于站上了山顶。风很大，把汗水吹干，整个人一下子清醒了。远处是城市的轮廓，近处是连绵的山脊线。那一刻觉得，所有的疲惫都值了。</p>
      <h3>下山</h3>
      <p>下山的路走得很轻松。夕阳把影子拉得很长，拉在石阶上一晃一晃的。回到山脚下，回头看了一眼——山还是那座山，但我已经不是出发时的我了。</p>
    `,
    },
  };

export default async function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const note = NOTES[slug];

  if (!note) {
    notFound();
  }

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <NoteBackLink />
        <div className="space-y-4">
          <time className="text-sm text-zinc-400">{note.date}</time>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {note.title}
          </h1>
        </div>
      </header>

      <Tiptap content={note.content} editable={false} />
    </article>
  );
}
