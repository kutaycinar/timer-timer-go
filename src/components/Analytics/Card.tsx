import "./Card.css";

function Card({
  children,
  title,
  span2,
}: {
  children: any;
  title?: string;
  span2?: boolean;
}) {
  return (
    <div className={`card ${span2 && "span2"}`}>
      {title && <h4 className="card-title">{title}</h4>}
      {children}
    </div>
  );
}

export default Card;
