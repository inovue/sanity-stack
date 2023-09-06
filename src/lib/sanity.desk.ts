import {DeskToolOptions} from 'sanity/desk'

const options:DeskToolOptions = {
  structure: (S) => S.list().title('Base').items([
    /*
    S.listItem().title('Site Meta').child(
      S.editor().schemaType('siteMeta').documentId('siteMeta')
    ),
    */
    
    S.listItem().title('Settings').child(
      S.editor().schemaType('settings').documentId('settings')
    ),
    S.divider(),
    S.listItem().title('Posts').child(
      S.documentTypeList('post').title('Posts')
    ),
    ...S.documentTypeListItems().filter(
      (listItem) =>
        ['openGraph', 'Post'].includes(listItem.getId()!)
    ),
  ])
}

export default options