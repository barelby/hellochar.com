import * as React from "react";

import ACTIONS from "./actions";
import { ACTIONS_EXTRACTED, iconExtractors } from "./extract";
import { Action, Icon, IconGainPoints, IconLosePoints, IconType } from "./interfaces";

const iconRenderers: { [K in IconType]: React.SFC<{ icon: Icon }> } = {
    interrupt: () => (
        <div className="icon interrupt"><i className="fa fa-hand-paper-o"></i></div>
    ),
    gainPoints: ({icon}) => {
        return <div className="icon gainPoints">+{icon.points}</div>;
    },
    losePoints: ({icon}) => {
        return <div className="icon losePoints">-{icon.points}</div>;
    },
    group: () => (
        <div className="icon group"><i className="fa fa-users" /></div>
    ),
    targetted: () => (
        <div className="icon targetted"><i className="fa fa-crosshairs" /></div>
    ),
    uninterruptable: () => (
        <div className="icon uninterruptable"><i className="fa fa-shield" /></div>
    ),
    imply: () => (
        <div className="icon imply">&#8658;</div>
    ),
    thumbs: () => (
        <div className="icon thumbs">
            <i className="fa fa-thumbs-o-up"></i>
            <i className="fa fa-thumbs-o-down"></i>
        </div>
    ),
    guess: () => (
        <div className="icon guess">
            <div className="cardshape">?</div>
        </div>
    ),
    card: ({icon}) => (
        <div className="icon card">
            <div className="cardshape text">{icon.text}</div>
        </div>
    ),
    command: () => (
        <div className="icon command">
            <img src="/assets/noun_command_cc.svg" />
        </div>
    ),
    check: () => (
        <div className="icon check">
            <i className="fa fa-check"></i>
        </div>
    ),
    return: () => (
        <div className="icon return">
            <i className="fa fa-reply"></i>
        </div>
    ),
    keep: () => (
        <div className="icon keep">
            <div className="cardshape"></div>
        </div>
    ),
    multiCard: ({icon}) => {
        const {count = 2} = icon;
        const cardShapes: JSX.Element[] = [];
        for (let i = 0; i < count; i++) {
            cardShapes.push(<div className="cardshape"></div>);
        }
        return (
            <div className="icon lay">
                <div className="cards-container">
                    {...cardShapes}
                </div>
            </div>
        );
    },
}

const IconRenderer: React.SFC<{icon: Icon, sentence: string}> = ({ icon, sentence }) => {
    const Renderer = iconRenderers[icon.type];
    return <Renderer icon={icon} />;
}

const ActionCard: React.SFC<{action: Action}> = ({ action }) => {
    const iconListsElements = action.iconLists.map((iconList) => {
        // HACKHACK sentence description is fucked
        const listElements = iconList.map((icon) =>
            <IconRenderer icon={icon} sentence={action.description} />,
        );
        return (
            <div className="action-icon-list">
                {...listElements}
            </div>
        )
    });
    return (
        <div className={`card card-${action.name.toLowerCase()}`}>
            <div className="card-wrapper">
                <div className="action-name">
                    {action.name}
                    {/* <div className="action-name-positioner">
                        <div className="action-name-vertical">{action.name.substr(1)}</div>
                    </div> */}
                </div>
                <div className="card-description">
                    <div className="action-icon-lists">
                        {...iconListsElements}
                    </div>
                    <div className="action-description">{action.description}</div>
                </div>
                {/* <div className="action-name corner corner-reverse">{action.name}</div> */}
            </div>
        </div>
    );
};

export default class Cards extends React.Component<{}, {}> {
    render() {
        const actionCards = ACTIONS.map((action) => <ActionCard action={action} />);
        const pages: JSX.Element[][] = [];
        for (let i = 0; i < actionCards.length; i++) {
            const card = actionCards[i];
            const pageIndex = Math.floor(i / 9);
            pages[pageIndex] = pages[pageIndex] || [];
            pages[pageIndex].push(card);
        }
        const pageEls = pages.map((pageChildren) => <div className="page">{...pageChildren}</div>);
        // const actionCards = ACTIONS_EXTRACTED.map((action) => <ActionCard action={action} />);
        return (
            <>
                {...pageEls}
                <div className="attribution">
                <h1>Attribution</h1>
                Icons by fontawesome.
                Command icon by Ruslan Dezign from the Noun Project.
                </div>
            </>
        );
    }
}