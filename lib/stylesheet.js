var download=require('./download');

module.exports = class StyleSheet {
    constructor() {
        this.rules=[];
    }
    toJSON() {
        return { type: "StyleSheet", data: this.rules }
    }
    static fromJSON(data) {
        var sheet=new StyleSheet();
        sheet.rules=data;
        return sheet;
    }
    download(fileName='stylesheet.json'){
        download(this.toJSON(), fileName);
    }
    static fromDocument(){ var sheet=new StyleSheet; sheet.rules=[].concat.apply([],[].concat.apply([],[...document.styleSheets].map(elem=>elem.cssRules)).map(ruleList=>[...ruleList].filter(rule=>"selectorText" in rule && "style" in rule))).map(rule=>[rule.selectorText, Object.entries(rule.style).filter(([k,v])=>!/\d/.test(k) && !!v).reduce((style, [k,v])=>(style[k]=v,style),{})]); return sheet; }
    static download() {
        StyleSheet.fromDocument().download();
    }
}