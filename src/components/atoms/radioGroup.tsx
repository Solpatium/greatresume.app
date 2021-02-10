import { Radio } from 'antd';


export type Option = [string, string]; //[value: string, label: string];

export const RadioGroup: React.FC<{
    value?: string;
    options: Option[];
    onChange: (value: string) => string;
}> = ({value, options, onChange}) => {
    return (<Radio.Group onChange={e => onChange(e.target.value)} value={value} size="large">
        {options.map(([value, label]) => <Radio.Button value={value}>{label}</Radio.Button>)}
    </Radio.Group>
);
}