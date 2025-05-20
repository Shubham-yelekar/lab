"use client";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { Trash2, Plus } from "lucide-react";
import { motion } from "motion/react";

const KanbanBoard = () => {
  return (
    <div className="h-full bg-neutral-100 text-neutral-900">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
  return (
    <div className="flex h-full w-full gap-4 overflow-scroll pt-4 px-4">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-orange-600"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-600"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-600"
        cards={cards}
        setCards={setCards}
      />
      <DeleteBox setCards={setCards} />
    </div>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-64 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-500 py-1 px-2 bg-neutral-200">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full rounded-2xl p-1 border-1 transition-colors ${
          active
            ? `bg-neutral-200 border-neutral-300`
            : "bg-white border-neutral-200  "
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        draggable="true"
        className="cursor-grab bg-neutral-100 rounded-xl border border-neutral-200 px-3 py-2 active:cursor-grabbing"
      >
        <p>{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-1 w-full rounded-full bg-blue-300 opacity-0"
    ></div>
  );
};

const DeleteBox = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = (e: DragEvent) => {
    setActive(false);
  };
  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    console.log(cardId);
    setActive(false);
  };
  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded-2xl border text-3xl ${
        active
          ? "border-red-600 bg-red-800/20 text-red-600"
          : "border-red-200 bg-red-100 text-red-400"
      }`}
    >
      <Trash2 />
    </div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };
    setCards((prev: []) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="addnew task"
            className="w-full rounded-xl px-3 py-2 border border-neutral-300 focus:outline-0 "
          ></textarea>
          <div className="w-full  flex items-center justify-end gap-2">
            <button
              onClick={() => setAdding(false)}
              className="font-semibold text-xs px-3 py-1 rounded-2xl bg-neutral-200 "
            >
              Close
            </button>
            <button
              type="submit"
              className="font-semibold text-xs px-3 py-1 rounded-2xl flex  items-center gap-1 bg-neutral-900 text-neutral-100 "
            >
              <span>Add</span>
              <Plus size={16} />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-2 bg-neutral-200 px-3 py-2 rounded-xl hover:bg-neutral-700 hover:text-neutral-100 transition-all duration-300"
        >
          <span>Add card</span>
          <Plus size={16} />
        </motion.button>
      )}
    </>
  );
};

export default KanbanBoard;

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
