const model = [
{
    name: 'units',
    label: 'Units ( default is Kelvin )',
    type: 'radio',
    options: [
        { value: 'metric', name: 'Celsius', checked: true},
        { value: 'imperial', name: 'Farenheit' }
    ],
    sizes: {xs: 12 , md: 6}
    
},
{
    name: 'location',
    label: 'Location',
    type: 'text',
    sizes: {xs: 12 , md: 4}
}
];

export default model;