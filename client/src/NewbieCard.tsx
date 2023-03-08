import React, { useEffect, useState } from "react";
import "./App.css";
import { Newbie } from "../../db-types";

type NewbieCardProps = {
  newbie: Newbie;
};

// function NewbieCard(props: { newbie : Newbie })
function NewbieCard({ newbie }: NewbieCardProps) {
  // props.newbie
  return (
    <div>
      <div>
        {newbie.firstName} {newbie.lastName} ({newbie.year})
      </div>
      <div>{newbie.birthday}</div>
    </div>
  );
}

export default NewbieCard;
