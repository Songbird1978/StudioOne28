import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsParagraph extends Struct.ComponentSchema {
  collectionName: 'components_elements_paragraphs';
  info: {
    displayName: 'paragraph';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
  };
}

export interface ElementsRepeatablePara extends Struct.ComponentSchema {
  collectionName: 'components_elements_repeatable_paras';
  info: {
    displayName: 'repeatablePara';
  };
  attributes: {
    paragraph: Schema.Attribute.Component<'elements.paragraph', true>;
  };
}

export interface ElementsTable extends Struct.ComponentSchema {
  collectionName: 'components_elements_tables';
  info: {
    displayName: 'Table';
  };
  attributes: {
    tableHeaders: Schema.Attribute.Component<'elements.table-headers', true>;
    tableRows: Schema.Attribute.Component<'elements.table-rows', true>;
  };
}

export interface ElementsTableHeaders extends Struct.ComponentSchema {
  collectionName: 'components_elements_table_headers';
  info: {
    displayName: 'tableHeaders';
  };
  attributes: {
    tableheader: Schema.Attribute.String;
  };
}

export interface ElementsTableRows extends Struct.ComponentSchema {
  collectionName: 'components_elements_table_rows';
  info: {
    displayName: 'tableRows';
  };
  attributes: {
    tableDataCell: Schema.Attribute.Text;
  };
}

export interface MediaAudioPlayer extends Struct.ComponentSchema {
  collectionName: 'components_media_audio_players';
  info: {
    displayName: 'audioPlayer';
  };
  attributes: {
    audio_file: Schema.Attribute.Relation<
      'oneToOne',
      'api::audio-file.audio-file'
    >;
    autoPlay: Schema.Attribute.Boolean;
    customCaption: Schema.Attribute.Blocks;
    playerStyle: Schema.Attribute.Enumeration<['compact', 'full ', 'minimal']>;
    showArtwork: Schema.Attribute.Boolean;
    titleOverRide: Schema.Attribute.String;
  };
}

export interface MediaAudioPlayerRepeatable extends Struct.ComponentSchema {
  collectionName: 'components_media_audio_player_repeatables';
  info: {
    displayName: 'audioPlayerRepeatable';
  };
  attributes: {
    audioPlayer: Schema.Attribute.Component<'media.audio-player', true>;
  };
}

export interface MediaGalleryPreview extends Struct.ComponentSchema {
  collectionName: 'components_media_gallery_previews';
  info: {
    displayName: 'galleryPreview';
  };
  attributes: {
    caption: Schema.Attribute.Blocks;
    galleryUrl: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface MediaGalleryPreviewRepeatable extends Struct.ComponentSchema {
  collectionName: 'components_media_gallery_preview_repeatables';
  info: {
    displayName: 'galleryPreviewRepeatable';
  };
  attributes: {
    galleryPreview: Schema.Attribute.Component<'media.gallery-preview', true>;
  };
}

export interface NavigationButton extends Struct.ComponentSchema {
  collectionName: 'components_navigation_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {};
}

export interface NavigationRelatedContent extends Struct.ComponentSchema {
  collectionName: 'components_navigation_related_contents';
  info: {
    displayName: 'relatedContent';
  };
  attributes: {
    audio_files: Schema.Attribute.Relation<
      'oneToMany',
      'api::audio-file.audio-file'
    >;
    name: Schema.Attribute.String;
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>;
  };
}

export interface NavigationRepeatableButton extends Struct.ComponentSchema {
  collectionName: 'components_navigation_repeatable_buttons';
  info: {
    displayName: 'repeatableButton';
  };
  attributes: {
    linkURL: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.paragraph': ElementsParagraph;
      'elements.repeatable-para': ElementsRepeatablePara;
      'elements.table': ElementsTable;
      'elements.table-headers': ElementsTableHeaders;
      'elements.table-rows': ElementsTableRows;
      'media.audio-player': MediaAudioPlayer;
      'media.audio-player-repeatable': MediaAudioPlayerRepeatable;
      'media.gallery-preview': MediaGalleryPreview;
      'media.gallery-preview-repeatable': MediaGalleryPreviewRepeatable;
      'navigation.button': NavigationButton;
      'navigation.related-content': NavigationRelatedContent;
      'navigation.repeatable-button': NavigationRepeatableButton;
    }
  }
}
