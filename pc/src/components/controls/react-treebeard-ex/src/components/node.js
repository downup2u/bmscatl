'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {VelocityTransitionGroup} from 'velocity-react';

import NodeHeader from './header';
import NodeRenderChildren from './noderenderchildren.js';

class TreeNode extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {node, onToggle} = this.props;
        const {toggled} = node;
        if (onToggle) {
            onToggle(node, !toggled);
        }
    }

    animations() {
        const {animations, node} = this.props;
        if (animations === false) {
            return false;
        }

        const anim = Object.assign({}, animations, node.animations);
        return {
            toggle: anim.toggle(this.props),
            drawer: anim.drawer(this.props)
        };
    }

    decorators() {
        // Merge Any Node Based Decorators Into The Pack
        const {decorators, node} = this.props;
        let nodeDecorators = node.decorators || {};
        return Object.assign({}, decorators, nodeDecorators);
    }

    render() {
        const {style,node,treeviewstyle} = this.props;
        const decorators = this.decorators();
        const animations = this.animations();
        const {gmap_treename,gmap_acode_treecount} = this.props;
        let isenable = true;
        if(node.type !== 'device'){
          if(treeviewstyle === 'byloc'){
            let nodecount = gmap_acode_treecount[node.adcode];
            isenable = !!nodecount && nodecount > 0;
          }
        }

        if(isenable){
          return (
              <li ref={ref => this.topLevelRef = ref}
                  style={style.base}>
                  {this.renderHeader(decorators, animations)}
                  {this.renderDrawer(decorators, animations)}
              </li>
          );
        }
        return null;
    }

    renderDrawer(decorators, animations) {
        const {node: {toggled}} = this.props;

        if (!animations && !toggled) {
            return null;
        } else if (!animations && toggled) {
            return this.renderChildren(decorators, animations);
        }

        const {animation, duration, ...restAnimationInfo} = animations.drawer;
        return (
            <VelocityTransitionGroup {...restAnimationInfo}
                                     ref={ref => this.velocityRef = ref}>
                {toggled ? this.renderChildren(decorators, animations) : null}
            </VelocityTransitionGroup>
        );
    }

    renderHeader(decorators, animations) {
        const {node, style} = this.props;
        return (
            <NodeHeader animations={animations}
                        decorators={decorators}
                        node={Object.assign({}, node)}
                        onClick={this.onClick}
                        style={style}/>
        );
    }

    renderChildren(decorators) {
        const {animations, decorators: propDecorators, node, style} = this.props;

        return <NodeRenderChildren decorators={decorators}
          animations={animations} node={node} style={style}
          renderLoading={this.renderLoading}
          _eventBubbles={this._eventBubbles()} />
    }

    renderLoading(decorators) {
        const {style} = this.props;
        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    _eventBubbles() {
        const {onToggle} = this.props;
        return {
            onToggle
        };
    }
}

TreeNode.propTypes = {
    style: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle: PropTypes.func
};
const mapStateToProps = ({device:{gmap_treename,gmap_acode_treecount,treeviewstyle}}) => {
  return {gmap_treename,gmap_acode_treecount,treeviewstyle};
}
TreeNode = connect(mapStateToProps)(TreeNode);
export default TreeNode;