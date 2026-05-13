import { rest } from 'msw';
import type { MapPoint } from '../../utils/typings';
import { MapPointType, MapType, PointPosition } from '../../utils/enum';
import mapdata from '../data/map';

type LegacyMapPoint = Omit<MapPoint, 'mapType' | 'position' | 'is_achievement' | 'delete_request' | 'x' | 'y'> &
  Partial<Pick<MapPoint, 'mapType' | 'position' | 'is_achievement' | 'delete_request' | 'x' | 'y'>> & {
    is_underground: boolean;
  };

type MockMapPoint = MapPoint & { is_underground: boolean };

const normalizeMapPoint = (point: LegacyMapPoint): MockMapPoint => {
  const mapType = point.mapType ?? (point.is_underground ? MapType.Underground : MapType.Default);

  return {
    ...point,
    type: point.type as MapPointType,
    is_achievement: point.is_achievement ?? false,
    delete_request: point.delete_request ?? 0,
    mapType,
    position: point.position ?? PointPosition.Surface,
    x: point.x ?? 'null',
    y: point.y ?? 'null',
    is_underground: point.is_underground ?? mapType === MapType.Underground,
  };
};

let map: MockMapPoint[] = (mapdata as LegacyMapPoint[]).map(normalizeMapPoint);
map = map.sort((a, b) => {
    return a.id - b.id;
})
let next_id = map.at(map.length - 1).id;

export default [
    rest.get('/api/map.php', (req, res, ctx) => {
        const id_para = req.url.searchParams.get('id');
        const ip_para = req.url.searchParams.get('ip');
        const count_para = req.url.searchParams.get('count');
        const type_para = req.url.searchParams.get('type');
        const under_para = req.url.searchParams.get('under');
        const kword_para = req.url.searchParams.get('kword');

        const id = Number(id_para);
        const ip = ip_para?.trim();
        const count = Number(count_para);
        const types = type_para?.split('|');
        const kword = kword_para?.trim();
        const under = Number(under_para) == 1 ? true : false;

        let selected_data: MockMapPoint[];

        if (id_para && id >= 0) {
            selected_data = map.filter(e => {
                return e.id == id;
            });
        } else {
            selected_data = map.filter(e => {
                return (!ip_para || e.ip == ip) && (!under_para || e.is_underground == under) && e.is_deleted == false
                    && (!kword_para || e.name.match(kword) || e.desc.match(kword))
                    && (!type_para || types.includes(e.type));
            }).sort((a, b) => {
                return a.like - b.like;
            });
            if (count && selected_data.length > count) {
                selected_data = selected_data.slice(0, count - 1);
            }
        }
        return res(
            ctx.json(selected_data),
            ctx.status(200),
        )
    }),
    rest.post('/api/map.php', (req, res, ctx) => {
        let date = new Date().toDateString();
        const mapType = Number(req.body['is_underground']) as MapType;

        map.push(({
            id: next_id++,
            type: (req.body['type'] as string)?.trim() as MapPointType,
            name: (req.body['name'] as string)?.trim(),
            desc: (req.body['desc'] as string)?.trim(),
            lng: req.body['lng'],
            lat: req.body['lat'],
            like: req.body['like'],
            dislike: req.body['dislike'],
            delete_request: 0,
            ip: (req.body['ip'] as string)?.trim(),
            is_underground: mapType === MapType.Underground,
            is_deleted: false,
            is_lock: false,
            is_achievement: false,
            mapType,
            position: PointPosition.Surface,
            create_date: date,
            update_date: date,
            x: 'null',
            y: 'null',
        }));
        return res(
            ctx.json(true),
            ctx.status(200),
        )
    }),
    rest.delete('/api/map.php', (req, res, ctx) => {
        const id = req.body['id'] as number;
        let result = false;
        for (let e of map) {
            if (e.id == id && !e.is_deleted) {
                e.is_deleted = true;
                e.update_date = new Date().toDateString();
                result = true;
            }
        }
        return res(
            ctx.json(result),
            ctx.status(200),
        )
    }),
    rest.patch('/api/map.php', (req, res, ctx) => {
        const id_para: string = req.body['id'];
        const type_para: string = req.body['type'];
        const name_para: string = req.body['name'];
        const desc_para: string = req.body['desc'];
        const lng_para: number = req.body['lng'];
        const lat_para: number = req.body['lat'];
        const like_para: number = req.body['like'];
        const dislike_para: number = req.body['dislike'];
        const ip_para: string = req.body['ip'];
        const is_underground_para: boolean = req.body['is_underground'];
        const is_deleted_para: boolean = req.body['is_deleted'];
        const is_lock_para: boolean = req.body['is_lock'];

        const id = Number(id_para);

        let result = false;
        map.every((e) => {
            if (e.id == id) {
                e.type = type_para ? type_para.trim() as MapPointType : e.type;
                e.name = name_para ? name_para.trim() : e.name;
                e.desc = desc_para ? desc_para.trim() : e.desc;
                e.lng = lng_para ? lng_para : e.lng;
                e.lat = lat_para ? lat_para : e.lat;
                e.like = like_para ? like_para : e.like;
                e.dislike = dislike_para ? dislike_para : e.dislike;
                e.ip = ip_para ? ip_para.trim() : e.ip;
                e.is_deleted = is_deleted_para ? is_deleted_para : e.is_deleted;
                e.is_lock = is_lock_para ? is_lock_para : e.is_lock;
                e.is_underground = is_underground_para ? is_underground_para : e.is_underground;
                e.mapType = e.is_underground ? MapType.Underground : MapType.Default;
                e.update_date = new Date().toDateString();
                result = true;
                return false;
            }
            return true;
        })
        return res(
            ctx.json(result),
            ctx.status(200),
        )
    }),
]
