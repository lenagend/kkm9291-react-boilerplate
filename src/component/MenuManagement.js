import React, { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview';
import { Tree } from '@minoru/react-dnd-treeview';
import {
    Box,
    Grid,
    TextField,
    Button,
    Paper,
    Stack,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { CustomNode } from './CustomNode';
import { CustomDragPreview } from './CustomDragPreview';
import styles from '/styles/Treeview.module.css';
import {Placeholder} from "./Placeholder";

const MenuManagement = () => {
    const [treeData, setTreeData] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [menuName, setMenuName] = useState('');
    const [active, setActive] = useState(true);
    const [linkType, setLinkType] = useState('INTERNAL');
    const [link, setLink] = useState('');
    const [order, setOrder] = useState(0);
    const [type, setType] = useState('');
    const [visibility, setVisibility] = useState('ALL');
    const [target, setTarget] = useState('_self');
    const [tooltip, setTooltip] = useState('');
    const treeRef = useRef(null);

    const handleDrop = (newTree) => {
        setTreeData(newTree);
    };

    const handleSelect = (node) => {
        setSelectedNode(node);
        setMenuName(node.text || '');
        setActive(node.active !== undefined ? node.active : true);
        setLinkType(node.data?.linkType || 'INTERNAL');
        setLink(node.data?.link || '');
        setOrder(node.data?.order || 0);
        setVisibility(node.data?.visibility || 'ALL');
        setTarget(node.data?.target || '_self');
        setTooltip(node.data?.tooltip || '');
    };



    const handleMenuChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'menuName':
                setMenuName(value);
                break;
            case 'link':
                setLink(value);
                break;
            case 'order':
                setOrder(Number(value));
                break;
            case 'type':
                setType(value);
                break;
            case 'tooltip':
                setTooltip(value);
                break;
            default:
                break;
        }
    };

    const handleRadioChange = (event) => {
        setActive(event.target.value === 'active');
    };

    const handleLinkTypeChange = (event) => {
        setLinkType(event.target.value);
    };

    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    const handleTargetChange = (event) => {
        setTarget(event.target.value);
    };

    const handleSave = () => {
        const updateNode = (data, id, newData) => {
            return data.map((item) => {
                if (item.id === id) {
                    return { ...item, ...newData };
                } else if (item.children) {
                    return { ...item, children: updateNode(item.children, id, newData) };
                } else {
                    return item;
                }
            });
        };
        const updatedTreeData = updateNode(treeData, selectedNode.id, {
            text: menuName,
            active,
            data: {
                linkType,
                link,
                order,
                visibility,
                target,
                tooltip,
            }
        });
        setTreeData(updatedTreeData);
    };




    const handleAddMenu = () => {
        const newMenuId = treeData.length + 1; // 새로운 메뉴의 ID
        const newMenu = {
            id: newMenuId,
            parent: selectedNode ? selectedNode.id : 0, // 선택한 메뉴의 하위 메뉴로 추가
            droppable: false, // 기본적으로 드롭이 불가능한 메뉴로 설정
            text: '새 메뉴', // 기본 메뉴 이름
            active: true,
            data: {
                linkType: 'INTERNAL',
                link: '',
                order: 0,
                visibility: 'ALL',
                target: '_self',
                tooltip: '',
                badge: '',
            }
        };

        // 선택된 노드가 있는 경우 해당 노드를 droppable로 설정
        const updatedTreeData = treeData.map((item) => {
            if (selectedNode && item.id === selectedNode.id) {
                return { ...item, droppable: true };
            }
            return item;
        });

        setTreeData([...updatedTreeData, newMenu]);
    };


    const handleOpenAll = () => treeRef.current?.openAll();
    const handleCloseAll = () => treeRef.current?.closeAll();

    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={0} md={3}/>
                    <Grid item xs={12} md={3}>
                        <Paper>
                            <Box p={2}>
                                <Stack mb={2} spacing={1} direction={"row"}>
                                    <Button size={"small"} variant="outlined" color="success" onClick={handleOpenAll}>
                                        모두 열기
                                    </Button>
                                    <Button size={"small"} variant="outlined" color="success" onClick={handleCloseAll}>
                                        모두 닫기
                                    </Button>
                                    <Button size={"small"} variant="contained" color="primary" onClick={handleAddMenu}>
                                        메뉴 추가
                                    </Button>
                                </Stack>
                                <Tree
                                    ref={treeRef}
                                    tree={treeData}
                                    rootId={0}
                                    onDrop={handleDrop}
                                    classes={{
                                        root: styles.treeRoot,
                                        draggingSource: styles.draggingSource,
                                        placeholder: styles.placeholderContainer,
                                        dropTarget: styles.dropTarget
                                    }}
                                    render={(node, { depth, isOpen, onToggle }) => (
                                        <CustomNode
                                            node={node}
                                            depth={depth}
                                            isOpen={isOpen}
                                            onToggle={onToggle}
                                            onSelect={handleSelect}
                                            isSelected={node.id === selectedNode?.id}
                                        />
                                    )}
                                    dragPreviewRender={(monitorProps) => (
                                        <CustomDragPreview monitorProps={monitorProps} />
                                    )}
                                    sort={false}
                                    insertDroppableFirst={false}
                                    canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                                        if (dragSource?.parent === dropTargetId) {
                                            return true;
                                        }
                                    }}
                                    dropTargetOffset={5}
                                    placeholderRender={(node, { depth }) => (
                                        <Placeholder node={node} depth={depth} />
                                    )}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper mt={2}>
                            <Box p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="menuName"
                                            name="menuName"
                                            label="메뉴 이름"
                                            fullWidth
                                            margin="normal"
                                            value={menuName}
                                            onChange={handleMenuChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <RadioGroup
                                            row
                                            aria-label="active"
                                            name="active"
                                            value={active ? 'active' : 'inactive'}
                                            onChange={handleRadioChange}
                                        >
                                            <FormControlLabel value="active" control={<Radio />} label="활성화" />
                                            <FormControlLabel value="inactive" control={<Radio />} label="비활성화" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="link"
                                            name="link"
                                            label="링크"
                                            fullWidth
                                            margin="normal"
                                            value={link}
                                            onChange={handleMenuChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <RadioGroup
                                            row
                                            aria-label="linkType"
                                            name="linkType"
                                            value={linkType}
                                            onChange={handleLinkTypeChange}
                                        >
                                            <FormControlLabel value="INTERNAL" control={<Radio />} label="내부" />
                                            <FormControlLabel value="EXTERNAL" control={<Radio />} label="외부" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="visibility-label">공개대상</InputLabel>
                                            <Select
                                                labelId="visibility-label"
                                                id="visibility"
                                                name="visibility"
                                                value={visibility}
                                                label="Visibility"
                                                onChange={handleVisibilityChange}
                                            >
                                                <MenuItem value="ALL">모두</MenuItem>
                                                <MenuItem value="MEMBERS">회원만</MenuItem>
                                                <MenuItem value="ADMIN">관리자만</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="target-label">새 창</InputLabel>
                                            <Select
                                                labelId="target-label"
                                                id="target"
                                                name="target"
                                                value={target}
                                                label="Target"
                                                onChange={handleTargetChange}
                                            >
                                                <MenuItem value="_self">미사용</MenuItem>
                                                <MenuItem value="_blank">사용</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="tooltip"
                                            name="tooltip"
                                            label="설명"
                                            fullWidth
                                            margin="normal"
                                            value={tooltip}
                                            onChange={handleMenuChange}
                                        />
                                    </Grid>                                  

                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" onClick={handleSave}>
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </DndProvider>
    );
};

export default MenuManagement;
