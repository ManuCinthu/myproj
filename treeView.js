import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';


const useStyles = makeStyles({
    root: {
      height: 110,
      flexGrow: 1,
      maxWidth: 400,
    },
  });

  export default function TreeModal(props) {
    const classes = useStyles();
    const renderTree = (nodes) => (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );

    return (
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(props.treeItem)}
        </TreeView>
      );
  }