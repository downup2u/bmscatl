import { createAction } from 'redux-act';

export const map_setmapinited = createAction('map_setmapinited');
export const mapmain_setmapcenter = createAction('mapmain_setmapcenter');
export const mapmain_setzoomlevel = createAction('mapmain_setzoomlevel');
export const mapmain_setenableddrawmapflag = createAction('mapmain_setenableddrawmapflag');

export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');
