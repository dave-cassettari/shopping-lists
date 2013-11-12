Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Lists");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Trips");
  }

  data.buffer.push("<nav class='sidebar'>\r\n	<h1 class='title'>Shopping Lists</h1>\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "lists", options) : helperMissing.call(depth0, "link-to", "lists", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "trips", options) : helperMissing.call(depth0, "link-to", "trips", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n</nav>\r\n\r\n<div class='content'>\r\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashContexts, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\r\n	<form class='edit' ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "STRING"};
  stack1 = helpers.view.call(depth0, "App.InputView", {hash:{
    'title': ("Name")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "STRING"};
  stack1 = helpers.view.call(depth0, "App.InputView", {hash:{
    'title': ("Quantity")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n        ");
  hashContexts = {'title': depth0};
  hashTypes = {'title': "STRING"};
  stack1 = helpers.view.call(depth0, "App.InputView", {hash:{
    'title': ("Units")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n		<button class='action-cancel left' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type='reset'>Cancel</button>\r\n		<button class='action-save right' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type='submit'>Save</button>\r\n	</form>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n            ");
  hashContexts = {'value': depth0,'autofocus': depth0};
  hashTypes = {'value': "ID",'autofocus': "STRING"};
  options = {hash:{
    'value': ("name"),
    'autofocus': ("autofocus")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n            ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("quantity")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n            ");
  hashContexts = {'content': depth0,'optionValuePath': depth0,'optionLabelPath': depth0,'selection': depth0,'prompt': depth0};
  hashTypes = {'content': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING",'selection': "ID",'prompt': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'content': ("units"),
    'optionValuePath': ("content.id"),
    'optionLabelPath': ("content.name"),
    'selection': ("model.unit"),
    'prompt': ("Choose a Unit")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n        ");
  return buffer;
  }

  hashContexts = {'cancelAction': depth0};
  hashTypes = {'cancelAction': "STRING"};
  stack1 = helpers.view.call(depth0, "App.ModalView", {hash:{
    'cancelAction': ("cancel")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("Add Item");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n			<li>\r\n                <span class='list-wrapper'>\r\n                    <span class='button-group'>\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("action-edit")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "item", "item", options) : helperMissing.call(depth0, "link-to", "item", "item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("action-delete")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "item.delete", "item", options) : helperMissing.call(depth0, "link-to", "item.delete", "item", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    </span>\r\n\r\n                    <span class='item-quantity'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.unit", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n                    <span class='item-quantity'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.quantity", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n                    <span class='item-quantity'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.amount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n                    <span class='item-title'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n                </span>\r\n			</li>\r\n        ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Edit");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Delete");
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n			<li class='empty'>\r\n				No Items\r\n			</li>\r\n        ");
  }

  data.buffer.push("<section>\r\n	<div class='button-group right'>\r\n        ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("button action-create")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "list.add", options) : helperMissing.call(depth0, "link-to", "list.add", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n	</div>\r\n\r\n	<h3>\r\n		<span class='total'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "itemsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n		<span class='title'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n	</h3>\r\n\r\n	<ul class='items'>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "item", "in", "items", {hash:{},inverse:self.program(8, program8, data),fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n	</ul>\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n</section>");
  return buffer;
  
});

Ember.TEMPLATES["list/delete"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashContexts, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n	<form class='edit'>\r\n        <p class='message-warning'>Are you sure you want to delete ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("?</p>\r\n\r\n		<button class='action-cancel left' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\r\n		<button class='action-delete right' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "delete", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Delete</button>\r\n	</form>\r\n");
  return buffer;
  }

  hashContexts = {'cancelAction': depth0};
  hashTypes = {'cancelAction': "STRING"};
  stack1 = helpers.view.call(depth0, "App.ModalView", {hash:{
    'cancelAction': ("cancel")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["list/edit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashContexts, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\r\n	<form class='edit' ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n        ");
  hashContexts = {'title': depth0,'value': depth0};
  hashTypes = {'title': "STRING",'value': "STRING"};
  stack1 = helpers.view.call(depth0, "App.InputView", {hash:{
    'title': ("Name"),
    'value': ("name")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n		<button class='action-cancel left' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type='reset'>Cancel</button>\r\n		<button class='action-save right' ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type='submit'>Save</button>\r\n	</form>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n            ");
  hashContexts = {'value': depth0,'autofocus': depth0};
  hashTypes = {'value': "ID",'autofocus': "STRING"};
  options = {hash:{
    'value': ("name"),
    'autofocus': ("autofocus")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        ");
  return buffer;
  }

  hashContexts = {'cancelAction': depth0};
  hashTypes = {'cancelAction': "STRING"};
  stack1 = helpers.view.call(depth0, "App.ModalView", {hash:{
    'cancelAction': ("cancel")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["lists"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Create New List");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n		<li>\r\n            <span class='list-wrapper'>\r\n                <span class='button-group'>\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("action-edit")
  },inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "list.edit", "list", options) : helperMissing.call(depth0, "link-to", "list.edit", "list", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("action-delete")
  },inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "list.delete", "list", options) : helperMissing.call(depth0, "link-to", "list.delete", "list", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				</span>\r\n\r\n                ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("item-title")
  },inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "list", "list", options) : helperMissing.call(depth0, "link-to", "list", "list", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n            </span>\r\n		</li>\r\n    ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Edit");
  }

function program6(depth0,data) {
  
  
  data.buffer.push("Delete");
  }

function program8(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n                    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "list.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n                ");
  return buffer;
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\r\n		<li class='empty'>Add a new List to start</li>\r\n    ");
  }

  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n\r\n<div class='button-group right'>\r\n    ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("button action-create")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "lists.create", options) : helperMissing.call(depth0, "link-to", "lists.create", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n</div>\r\n\r\n<h2><span class='total'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "listsCount", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span> Lists</h2>\r\n\r\n<ul class='items'>\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "list", "in", "controller", {hash:{},inverse:self.program(10, program10, data),fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n</ul>");
  return buffer;
  
});

Ember.TEMPLATES["views/layouts/input"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n	<span class='error'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.error", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n    ");
  return buffer;
  }

  data.buffer.push("<label>\r\n	<span class='title'>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n\r\n    <span class='input-container'>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n	</span>\r\n\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "view.error", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</label>");
  return buffer;
  
});

Ember.TEMPLATES["views/layouts/modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class='modal-wrapper'>\r\n	<div class='modal'>\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "yield", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n	</div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["views/templates/editable"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n	<input type='text' class='editing' autofocus='autofocus' ");
  hashContexts = {'value': depth0};
  hashTypes = {'value': "ID"};
  options = {hash:{
    'value': ("view.text")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(" ");
  hashContexts = {'onEvent': depth0,'target': depth0};
  hashTypes = {'onEvent': "STRING",'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'onEvent': ("focusOut"),
    'target': ("view")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\r\n	<span class='editable' ");
  hashContexts = {'target': depth0};
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "edit", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.text", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</span>\r\n");
  return buffer;
  }

  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "view.edit", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});