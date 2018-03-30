import { h, app } from 'hyperapp';
import options from './options';

const state = {
    selected: {
        printWidth: null,
        tabWidth: null,
        useTabs: null,
        semi: null,
        singleQuote: null,
        trailingComma: null,
        bracketSpacing: null,
        jsxBracketSameLine: null,
        arrowParens: null,
        rangeStart: null,
        rangeEnd: null,
        filePath: null,
        requirePragma: null,
        insertPragma: null,
        proseWrap: null
    },
    showConfig: false,
    generatedConfig: ''
};

const actions = {
    selected: {
        updateOption: ({name, value}) => state => ({[name]: value})
    },
    resetConfig: () => state => {
        const keys = Object.keys(state.selected);
        const selected = keys.reduce((acc, k) => {
            const newObject = {[k]: null};
            return {...acc, ...newObject};
        }, {});
        return {
            showConfig: false,
            generatedConfig: null,
            selected
        }
    },
    generateConfig: () => state => {
        const {selected} = state;
        const keys = Object.keys(state.selected);
        const result = keys.reduce((acc, k) => {
            const selectedKey = selected[k];
            const optionKey = options.find((o) => o.key === k);
            const validate = optionKey.validate;
            const value = (selectedKey !== null && validate === 'integer') ? parseInt(selectedKey) : selectedKey;
            const newObject = {[k]: value};
            return value !== null ?
                {...acc, ...newObject} : acc;
        }, {});
        const generatedConfig = JSON.stringify(result);
        return {
            showConfig: true,
            generatedConfig
        }
    }
};

const Option = ({ name, key, description, type, options, state, clickFunc }) => (
    <div class="box">
        <h3>{name}</h3>
        <div class="description">{description}</div>
        {
            type == 'buttons' ?
            <div>{options.map((o) => (
                <button
                    class={ state === o && 'selected' }
                    key={o}
                    onclick={e =>
                        clickFunc({
                            name: key,
                            value: o
                        })
                    }>
                    {o.toString()}
                </button>
            ))}</div> :
            <div>
                <input
                    onkeyup={({ target: {value}}) =>
                        clickFunc({
                            name: key,
                            value: value
                        })
                    }
                />
            </div>
        }
    </div>
);

const Config = ({generatedConfig, resetConfig}) => (
    <div class="modal-overlay">
        <div class="modal">
            <h2>Your prettier config:</h2>
            <textarea name="textarea" autofocus rows="10" cols="50">
                {generatedConfig}
            </textarea>
            <div class="description">Copy and paste this into your project's <code>.prettierrc</code> file. </div>
            <div class="description">Tip: Run prettier on this file! <code>prettier .prettierrc --write</code></div>
            <div>
                <button class="green" onclick={resetConfig}>Generate a new config</button>
            </div>
        </div>
    </div>
);

const view = (state, actions) => (
    <div>
        { state.showConfig && <Config generatedConfig={state.generatedConfig} resetConfig={actions.resetConfig} /> }
        <h1>Prettier Config Generator</h1>
        <div class="description">Select/fill in a few options to generate a json file you can use for your .prettierrc file #lazyftw</div>
        <div class="container">
            {options.map(({ name, key, description, type, options }) => {
                return (
                    <Option
                        name={name}
                        key={key}
                        type={type}
                        description={description}
                        state={state.selected[key]}
                        options={options}
                        clickFunc={actions.selected.updateOption}
                    />
                )
            })}
            <button class="box green" onclick={actions.generateConfig}>Generate Config</button>
        </div>
    </div>
);

app(state, actions, view, document.body);
