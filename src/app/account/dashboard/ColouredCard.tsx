import React from "react";

//receive props
//render a card with the props
//use the props to render the card
//use the props to render the card
interface Props {
  title: string;
  count: number;
}

export const ColouredCard = ({ title, count }: Props) => {
  return (
    <div className="col-md-3">
      <div
        className={`card text-white bg-blue mb-3`}
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header" style={{ color: "black" }}>
          {title}
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "black" }}>
            {count}
          </h5>
        </div>
      </div>
    </div>
  );
};
