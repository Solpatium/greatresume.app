import { View, Text, Link } from "@react-pdf/renderer";
import React from "react";

import { marked } from 'marked';
import { V } from "./view";
import { T } from "./text";

marked.setOptions({
    gfm: false,
});

export interface MarkdownStyle {
    unorderedListGlyph?: () => React.ReactElement;
}

interface TProps {
    children: string;
    style?: MarkdownStyle;
}

const defaultUnorderedListGlyph = <View style={{ marginRight: 4 }}><Text>-</Text></View>

const Token: React.FC<{ token: marked.Token, style: MarkdownStyle }> = ({ token, style }) => {
    if (token.type === "text") {
        return <Text>{"tokens" in token && token.tokens ? renderTokens(token.tokens, style) : token.text}</Text>;
    }

    // We only support unordered list
    if (token.type === "list" && !token.ordered) {
        // Margin right is a workaround for text going out of bounding box :|
        return <V className="ul" style={{ marginRight: 20 }}>
            {token.items.map((item, i) => (
                <V key={i} className="li" style={{ display: "flex", flexDirection: "row" }}>
                    {style.unorderedListGlyph?.() ?? defaultUnorderedListGlyph}
                    <View>{renderTokens(item.tokens, style)}</View>
                </V>))
            }
        </V>
    }

    if (token.type === "strong" || token.type === "em" || token.type === "paragraph") {
        return <T className={token.type}>{renderTokens(token.tokens, style)}</T>;
    }

    if (token.type === "link") {
        return <T className="textLink" url={token.href}>{renderTokens(token.tokens, style)}</T>;
    }

    if (token.type === "space") {
        return <V showEmpty className="space" />
    }

    return <Text>{token.raw}</Text>
}

const renderTokens = (tokens: marked.Token[], style: MarkdownStyle): React.ReactElement => (
    <View>
        {tokens.map((token, i) => <Token key={i} token={token} style={style} />)}
    </View>
)


// We don't want to render an empty text component`
export const Markdown: React.FC<TProps> = ({ children, style }) => {
    let parsed: marked.TokensList = marked.lexer(children)

    return renderTokens(parsed, style ?? {});
};