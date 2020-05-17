import React, { FC } from 'react';
import styled from 'styled-components';

type Node = {
  label: string;
  value: string;
  children?: Node[];
};

interface TreeMasterProps {
  tree: Node;
  className?: string;
  onSelect: (value: string) => void;
}

interface TreeNodeProps {
  node: Node;
  onSelect: (value: string) => void;
}

const TreeNode: FC<TreeNodeProps> = ({ node, onSelect }) => (
  <li>
    <button onClick={() => onSelect(node.value)}>{node.label}</button>
    {node.children && node.children.length > 0 && (
      <ul>
        {node.children.map((child, index) => (
          <TreeNode
            node={child}
            onSelect={onSelect}
            key={`${node.label}-${index}`}
          />
        ))}
      </ul>
    )}
  </li>
);

const TreeMaster: FC<TreeMasterProps> = ({ tree, className, onSelect }) => {
  return (
    <div className={className}>
      <ul>
        <TreeNode node={tree} onSelect={onSelect} />
      </ul>
    </div>
  );
};

// Inspired by https://codepen.io/philippkuehn/pen/QbrOaN
export const Tree = styled(TreeMaster)`
  ul {
    position: relative;
    padding: 1em 0;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    ul::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      border-left: 1px solid #ccc;
      width: 0;
      height: 1em;
    }
  }

  li {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    list-style-type: none;
    position: relative;
    padding: 1em 0.5em 0 0.5em;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      border-top: 1px solid #ccc;
      width: 50%;
      height: 1em;
    }

    &::after {
      right: auto;
      left: 50%;
      border-left: 1px solid #ccc;
    }

    &:only-child::after,
    &:only-child::before {
      display: none;
    }

    &:only-child {
      padding-top: 0;
    }

    &:first-child::before,
    &:last-child::after {
      border: 0 none;
    }

    &:last-child::before {
      border-right: 1px solid #ccc;
      border-radius: 0 5px 0 0;
    }

    &:first-child::after {
      border-radius: 5px 0 0 0;
    }

    button {
      cursor: pointer;
      border: 1px solid #ccc;
      padding: 0.5em 0.75em;
      text-decoration: none;
      display: inline-block;
      border-radius: 5px;
      color: #333;
      position: relative;
      font-size: 18px;
    }
  }
`;
