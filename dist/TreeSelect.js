"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const CheckBox_1 = __importDefault(require("@mui/icons-material/CheckBox"));
const CheckBoxOutlineBlank_1 = __importDefault(require("@mui/icons-material/CheckBoxOutlineBlank"));
const IndeterminateCheckBox_1 = __importDefault(require("@mui/icons-material/IndeterminateCheckBox"));
const icons_material_1 = require("@mui/icons-material");
const react_1 = __importStar(require("react"));
const TreeItem = ({ fieId, label, checked, sx, onChange }) => {
    const { labelRender } = (0, react_1.useContext)(TreeSelectContext);
    return (react_1.default.createElement(material_1.Stack, { direction: "row", sx: sx, alignItems: "center" },
        react_1.default.createElement(material_1.Checkbox, { checked: checked, onChange: (e, checked) => {
                onChange === null || onChange === void 0 ? void 0 : onChange(fieId, checked, {});
            } }),
        labelRender ? labelRender(label) : react_1.default.createElement(material_1.Typography, null, label)));
};
// const createFolder = (children: any[]) => {
//   const newFolder: any[] = []
//   children.forEach(item => {
//     if (item[childrenId]) {
//       const newChildren = createFolder(item[childrenId])
//       newFolder.push({ ...item, children: newChildren, checked: "part" })
//     } else {
//       newFolder.push({ ...item, checked: false })
//     }
//   })
//   return newFolder
// }
const createTreeData = (datalist, config) => {
    const { id, labelId, childrenId, checkedDataIds, selectAll } = config;
    const TreeData = [];
    datalist.forEach(item => {
        var _a;
        if ((_a = item[childrenId]) === null || _a === void 0 ? void 0 : _a.length) {
            const newfolder = createTreeData(item[childrenId], { id, labelId, childrenId, checkedDataIds, selectAll });
            let selectType = undefined;
            deepForEach(newfolder, (item) => {
                if (selectType === undefined) { //第一次存储
                    if (typeof item.checked === "boolean") {
                        selectType = item.checked;
                    }
                }
                else {
                    if (typeof item.checked === "boolean") {
                        if (item.checked !== selectType) {
                            selectType = "part";
                        }
                    }
                }
            }, childrenId);
            if (selectType === true) { //全选
                TreeData.push(Object.assign(Object.assign({}, item), { [childrenId]: newfolder, checked: "all" }));
            }
            else if (selectType === false) { //全取消
                TreeData.push(Object.assign(Object.assign({}, item), { [childrenId]: newfolder, checked: "null" }));
            }
            else {
                TreeData.push(Object.assign(Object.assign({}, item), { [childrenId]: newfolder, checked: "part" }));
            }
        }
        else {
            if (checkedDataIds === null || checkedDataIds === void 0 ? void 0 : checkedDataIds.includes(item[id])) {
                TreeData.push(Object.assign(Object.assign({}, item), { checked: true }));
            }
            else {
                TreeData.push(Object.assign(Object.assign({}, item), { checked: selectAll ? true : false }));
            }
        }
    });
    return TreeData;
};
const TreeFolder = ({ label, fieId, checked, children, sx, onChange, onChildChange, }) => {
    const { id, labelId, childrenId, checkIconDict, ExpandICON, RetractICON, FolderICON, labelRender } = (0, react_1.useContext)(TreeSelectContext);
    const [collapse, setCollapse] = (0, react_1.useState)(false);
    // console.log({ checkIconDict, checked, children, fieId })
    return (react_1.default.createElement(material_1.Stack, { sx: sx },
        react_1.default.createElement(material_1.Stack, { direction: "row", alignItems: "center" },
            react_1.default.createElement("div", { style: { display: "flex", alignItems: "center" }, onClick: () => setCollapse(!collapse) }, collapse ? RetractICON !== null && RetractICON !== void 0 ? RetractICON : react_1.default.createElement(icons_material_1.ExpandLess, null) : ExpandICON !== null && ExpandICON !== void 0 ? ExpandICON : react_1.default.createElement(icons_material_1.ExpandMore, null)),
            react_1.default.createElement(material_1.Checkbox, { checked: checked === "null" ? false : true, icon: FolderICON, checkedIcon: checkIconDict === null || checkIconDict === void 0 ? void 0 : checkIconDict[checked], onChange: (e, checked) => {
                    if (checked) { //全选
                        onChange === null || onChange === void 0 ? void 0 : onChange(fieId, "all", { children });
                    }
                    else {
                        onChange === null || onChange === void 0 ? void 0 : onChange(fieId, "null", { children });
                    }
                } }),
            labelRender ? labelRender(label) : react_1.default.createElement(material_1.Typography, null, label)),
        react_1.default.createElement(material_1.Collapse, { in: collapse, timeout: "auto", unmountOnExit: true, sx: { pl: 8, display: "felx", height: "36" } },
            react_1.default.createElement("div", null, children === null || children === void 0 ? void 0 : children.map(item => {
                var _a;
                if ((_a = item[childrenId]) === null || _a === void 0 ? void 0 : _a.length) {
                    // console.log({ item })
                    return (react_1.default.createElement(TreeFolder, { key: item[id], fieId: item[id], label: item[labelId], checked: item.checked, children: item[childrenId], onChange: onChange, onChildChange: onChildChange }));
                }
                else {
                    return (react_1.default.createElement(TreeItem, { key: item[id], fieId: item[id], label: item[labelId], checked: item.checked, onChange: onChildChange }));
                }
            })))));
};
const deepForEach = (data, action, childrenId) => {
    data.forEach(item => {
        var _a;
        if ((_a = item[childrenId]) === null || _a === void 0 ? void 0 : _a.length) {
            deepForEach(item[childrenId], action, childrenId);
        }
        else {
            action(item);
        }
    });
};
const TreeSelectContext = (0, react_1.createContext)({
    id: "id",
    labelId: "label",
    childrenId: "children",
});
function TreeSelect(props) {
    const { id = "id", labelId = "label", childrenId = "children", data, checkedDataIds, onChange, sx, FolderICON, CheckPartICON, CheckAllICON, ExpandICON, RetractICON, labelRender } = props;
    const TreeData = createTreeData(data, {
        id,
        labelId,
        childrenId,
        checkedDataIds
    });
    const checkIconDict = (0, react_1.useMemo)(() => {
        return {
            "all": CheckAllICON !== null && CheckAllICON !== void 0 ? CheckAllICON : react_1.default.createElement(CheckBox_1.default, null),
            "part": CheckPartICON !== null && CheckPartICON !== void 0 ? CheckPartICON : react_1.default.createElement(IndeterminateCheckBox_1.default, null),
            "null": react_1.default.createElement(CheckBoxOutlineBlank_1.default, null)
        };
    }, [CheckAllICON, CheckPartICON]);
    const theme = (0, material_1.useTheme)();
    return (react_1.default.createElement(TreeSelectContext.Provider, { value: {
            id, labelId, childrenId,
            FolderICON, CheckPartICON, CheckAllICON,
            ExpandICON, RetractICON, checkIconDict, labelRender
        } },
        react_1.default.createElement(material_1.List, { sx: Object.assign({ bgcolor: theme.palette.background.paper, minWidth: 300, p: 2, borderRadius: 2 }, sx) }, TreeData.map(item => {
            if (item[childrenId]) {
                return react_1.default.createElement(TreeFolder, { key: item[id], fieId: item[id], label: item[labelId], children: item[childrenId], checked: item.checked, onChange: (cid, checked, other) => {
                        const { children } = other;
                        if (checked === "all") {
                            const newChildren = createTreeData(children, {
                                id,
                                labelId,
                                childrenId,
                                selectAll: true
                            });
                            const newChecked = [];
                            deepForEach(newChildren, (item) => {
                                if (item.checked === true) {
                                    newChecked.push(item[id]);
                                }
                            }, childrenId);
                            onChange === null || onChange === void 0 ? void 0 : onChange([...new Set([...checkedDataIds, ...newChecked])]);
                        }
                        else {
                            const newChildren = createTreeData(children, {
                                id,
                                labelId,
                                childrenId,
                            });
                            const newChecked = [...checkedDataIds];
                            deepForEach(newChildren, (item) => {
                                if (newChecked.includes(item[id])) {
                                    const index = newChecked.indexOf(item[id]);
                                    newChecked.splice(index, 1);
                                }
                                onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
                            }, childrenId);
                        }
                    }, onChildChange: (cid, checked, other) => {
                        if (checked === true) {
                            onChange === null || onChange === void 0 ? void 0 : onChange([...checkedDataIds, cid]);
                        }
                        else {
                            const newChecked = [...checkedDataIds];
                            const index = newChecked.indexOf(cid);
                            newChecked.splice(index, 1);
                            onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
                        }
                    } });
            }
            else {
                return react_1.default.createElement(TreeItem, { key: item[id], fieId: item[id], label: item[labelId], checked: item.checked, sx: { pl: 3 }, onChange: (cid, checked, other) => {
                        // console.log(cid, checked, other)
                        if (checked === true) {
                            onChange === null || onChange === void 0 ? void 0 : onChange([...checkedDataIds, cid]);
                        }
                        else {
                            const newChecked = [...checkedDataIds];
                            const index = newChecked.indexOf(cid);
                            newChecked.splice(index, 1);
                            onChange === null || onChange === void 0 ? void 0 : onChange(newChecked);
                        }
                    } });
            }
        }))));
}
exports.default = TreeSelect;
