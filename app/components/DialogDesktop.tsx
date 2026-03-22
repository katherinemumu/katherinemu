'use client';
import { useState } from "react";
import Dialog from "./Dialog";

export default function DialogDesktop() {
    const [dialogs, setDialogs] = useState([
        {
            id: 'game-1',
            text: 'a game',
            initialX: 100,
            initialY: 40,
            width: 400,
            height: 400,
            zIndex: 1,
            styles: {}
        },
        {
            id: 'game-2',
            text: 'another game',
            initialX: 150,
            initialY: 500,
            width: 400,
            height: 400,
            zIndex: 2,
            styles:{}
        },
        {
            id: 'intro',
            text: "hello! i'm katherine",
            initialX: 400,
            initialY: 150,
            width: 800,
            height: 800,
            zIndex: 3,
            styles: {fontFamily: 'monospace', fontSize: '64px'}
        },
    ]);

    const [nextZIndex, setNextZIndex] = useState(dialogs.length + 1);

    const bringToFront = (id: string) => {
        setDialogs(prevDialogs =>
            prevDialogs.map(dialog =>
                dialog.id === id
                    ? { ...dialog, zIndex: nextZIndex }
                    : dialog
            )
        );
        setNextZIndex(prev => prev + 1);
    };

    return (
        <div>
            {dialogs.map(dialog => (
                <Dialog
                    key={dialog.id}
                    text={dialog.text}
                    initialX={dialog.initialX}
                    initialY={dialog.initialY}
                    width={dialog.width}
                    height={dialog.height}
                    zIndex={dialog.zIndex}
                    styles={dialog.styles}
                    onBringToFront={() => bringToFront(dialog.id)}
                />
            ))}
        </div>
    );
}