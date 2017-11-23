import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { required,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,ReferenceField,
 Filter,Filters,ReferenceInput,SelectInput } from 'admin-on-rest/lib/mui';

 import { ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const DataDictTitle = ({record}) => {
  return <span>数据字典</span>
};

const DataDictCreate = (props) => (
  <Create title="创建数据字典字段" {...props}>
    <SimpleForm>
      <TextInput label="字段名" source="name" validate={required} />
      <TextInput label="字段全名" source="fullname" />
      <TextInput label="字段显示名" source="showname" />
      <TextInput label="字段类型" source="type" />
      <TextInput label="字段描述" source="desc" />
      <TextInput label="字段单位" source="unit" />
    </SimpleForm>
  </Create>
);

const DataDictEdit = (props) => {
  return (<Edit title="编辑数据字典字段" {...props}>
    <SimpleForm>
      <TextInput label="字段名" source="name" validate={required} />
      <TextInput label="字段全名" source="fullname" />
      <TextInput label="字段显示名" source="showname" />
      <TextInput label="字段类型" source="type" />
      <TextInput label="字段描述" source="desc" />
      <TextInput label="字段单位" source="unit" />
    </SimpleForm>
  </Edit>
  );
};

const DataDictList = (props) => (
  <List title={<DataDictTitle />} {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="字段名" source="name" validate={required} />
      <TextField label="字段全名" source="fullname" />
      <TextField label="字段显示名" source="showname" />
      <TextField label="字段类型" source="type" />
      <TextField label="字段描述" source="desc" />
      <TextField label="字段单位" source="unit" />
      <EditButton />
    </Datagrid>
  </List>
);




export {DataDictCreate,DataDictList,DataDictEdit};