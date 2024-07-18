import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import {
    Tree,
    MultiBackend,
    getBackendOptions
} from "@minoru/react-dnd-treeview";
import SampleData from "../data/sample_data.json";

function App() {
    const [treeData, setTreeData] = useState(SampleData);
    const handleDrop = (newTree) => setTreeData(newTree);

    return (
        <div className="app">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Tree
                    tree={treeData}
                    rootId={0}
                    render={(node, { depth, isOpen, onToggle }) => (
                        <div style={{ marginInlineStart: depth * 10 }}>
                            {node.droppable && (
                                <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                            )}
                            {node.text}
                        </div>
                    )}
                    dragPreviewRender={(monitorProps) => (
                        <div>{monitorProps.item.text}</div>
                    )}
                    onDrop={handleDrop}
                />
            </DndProvider>
        </div>
    );
}

export default App;
