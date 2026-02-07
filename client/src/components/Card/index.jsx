import './card.css';

export default function Card({content}) {
  const title = content.title;
  const synopsis = content.synopsis;

  return (
    <div className="Card">
      <div className="title">{title}</div>
    </div>
  )
}