import "./Card.css";

function Card({ children, title }: { children: any; title?: string }) {
  return (
    <div className="card">
      {title && <h4 className="card-title">{title}</h4>}
      {children}
    </div>
  );
}

export default Card;
