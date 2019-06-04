## API

  * #### props


	prop           | descripton                   | type                   | default
	---------------|------------------------------|:----------------------:|---------------------
	data           |                              | `Object`               |
	props          |  configure props             | `Object`               | `{label: 'label', children: 'children', expand: 'expand'}`
	labelWidth     |  node label width            | `String` \| `Number`.  | `auto`
	collapsable    | children node is collapsable | `Boolean`              | `true`
	renderContent  | how to render node label     | `Function`             |     -
	labelClassName | node label class             | `Function` \| `String` |     -


  * ### events

    - on-expand

      well be called when the collapse-btn clicked


    - on-node-click

      well be called when the node-label clicked
