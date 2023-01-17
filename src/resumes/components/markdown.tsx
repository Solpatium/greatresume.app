import { View, Text, Link } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import React from "react";

import { marked } from 'marked';

marked.setOptions({
    gfm: false, 
});

export interface MarkdownStyle {
    list: Style,
    listElement: Style,
    strong: Style,
    link: Style,
    em: Style,
    paragraph: Style,
    space: Style,
    unorderedListGlyph?: () => React.ReactElement;
}

interface TProps {
    children: string;
    style: MarkdownStyle;
}

const defaultUnorderedListGlyph = <View style={{marginRight: 8}}><Text>●</Text></View>

const renderToken = (token: marked.Token, style: MarkdownStyle): React.ReactElement => {
    if (token.type === "text") {
        return <Text>{"tokens" in token && token.tokens ? renderTokens(token.tokens, style) : token.text}</Text>;
    }

    // We only support unordered list
    if (token.type === "list" && !token.ordered) {
        return <View style={style.list}>
            {token.items.map(item => (
                <View style={[{display: "flex", flexDirection: "row"}, style.listElement]}>
                    {style.unorderedListGlyph?.() ?? defaultUnorderedListGlyph}
                    <Text>{renderTokens(item.tokens, style)}</Text>
                </View>))
            }
        </View>
    }

    if (token.type === "strong" || token.type === "em" || token.type === "paragraph") {
        return <Text style={style[token.type]}>{renderTokens(token.tokens, style)}</Text>;
    }

    if (token.type === "link") {
        return <Link style={style.link} src={token.href}>{renderTokens(token.tokens, style)}</Link>;
    }

    if (token.type === "space") {
        return <View style={style.space}/>
    }

    return <Text>{token.raw}</Text>
}

const renderTokens = (tokens: marked.Token[], style: MarkdownStyle): React.ReactElement => (
    <View>
        {tokens.map(token => renderToken(token, style))}
    </View>
)


//TODO CACHE
// We don't want to render an empty text component`
export const Markdown: React.FC<TProps> = ({ children, style }) => {
    let parsed: marked.TokensList = marked.lexer(children)

    console.log(parsed);
    return renderTokens(parsed, style);
};