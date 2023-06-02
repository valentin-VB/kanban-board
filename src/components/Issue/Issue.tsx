import { daysFromToday, getRandomColor } from "@/services/helpers";
import { IDragItem, IIssue } from "@/services/interfaces";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Issue({
  issue,
  index,
  fromColumn,
}: {
  issue: IIssue;
  index: number;
  fromColumn: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [{ isDragging }, drag] = useDrag({
    type: "Issue",
    item: { id: issue.id, index, fromColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  const [_, drop] = useDrop<IDragItem>({
    accept: "Issue",
    hover: (item, monitor) => {
      if (item.fromColumn !== fromColumn || !ref.current) return;
      const { index: draggedItemIndex } = item;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) return;

      const { y: mouseY } = monitor.getClientOffset() as XYCoord;
      const hoveredBoundingRect = ref.current.getBoundingClientRect();
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;
      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (
        (draggedItemIndex < hoveredItemIndex &&
          isMouseYAboveHoveredMiddleHeight) ||
        (draggedItemIndex > hoveredItemIndex &&
          isMouseYBelowHoveredMiddleHeight)
      ) {
        return; //"didn't pass the middle target by draggedItem - return"
      }
      dispatch(
        handleDropHover({ draggedItemIndex, hoveredItemIndex, fromColumn })
      );
      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  const { title, number, created_at } = issue;
  return (
    <li
      ref={ref}
      className="board__issue-wrapper"
      style={{
        backgroundColor: color,
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div>
        <h3 className="board__issue-title">{title}</h3>
        <div>
          <p>{`#${number} open ${daysFromToday(created_at)} days ago`}</p>
        </div>
      </div>
    </li>
  );
}

export default Issue;
