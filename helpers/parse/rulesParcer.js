import RuleTemplate from "../../Templates/JSON/RuleTemplate.js";

export default (rules) => {

    // const regExpGroup = /\- [^}]*\ -|\[-[^}]*\-]/;
    const regExpGroup = /\[-(.*?)\-]|\- (.*?)\ -/;


    let result = {};
    let group = [];
    let groupName = '';

    rules.forEach(rule => {
        const ruleText = rule.text.trim();

        if (ruleText.match(regExpGroup)) {

            if (groupName !== '') {
                result[groupName] = group;
                group = [];
                groupName = '';
            }
            groupName = regExpGroup.exec(ruleText)[0]
                .replace(/(-)|(\[)|(\])/g, '')
                .trim();

        } else {

            group.push(RuleTemplate(rule));

        }
    })

    if(Object.keys(result).length === 0){
        result = group;
    }

    result[groupName] = group;

    return result;
}