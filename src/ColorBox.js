import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import classNames from "classnames";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };

        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({
            copied: true
        },
        () => {
            setTimeout(() => this.setState({
                copied: false
            }), 1500);
        });
    }

    render() {
        const {name, background, moreUrl, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{background}}>
                    <div 
                        className={classNames(classes.copyOverlay, {
                            [classes.showOverlay]: copied
                        })} 
                        style={{background}}
                    />
                    <div 
                        className={classNames(classes.copyMsg, {
                            [classes.showMsg]: copied
                        })} 
                    >
                        <h1>Copied</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>
                                {name}
                            </span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={evt => evt.stopPropagation()}>
                            <span className={classes.seeMore}>
                                More
                            </span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);