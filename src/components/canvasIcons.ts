/**
 * 自定义地图图标
 * @description 导出的是生成图标数据的函数，用法：`L.divIcon(iconname(size, fontcolor)(title))`
 */
type CanvasIcon = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
};

type CanvasIconFactory = (size?: number, fontcolor?: string) => (title?: string, fontSize?: string) => CanvasIcon;

const createCanvasIcon = (defaultSize: number): CanvasIconFactory => {
  return (size: number = defaultSize) => {
    return () => ({
      iconUrl: './resource/icons/boss.png',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };
};

export const MapCanvasIcon: Record<string, CanvasIconFactory> = {
  default: createCanvasIcon(10),
  cifu: createCanvasIcon(20),
  boss: createCanvasIcon(30),
  littleboss: createCanvasIcon(28),
  portal: createCanvasIcon(24),
  message: createCanvasIcon(20),
  warning: createCanvasIcon(15),
  question: createCanvasIcon(15),
  collect: createCanvasIcon(20),
  white: createCanvasIcon(10),
  yellow: createCanvasIcon(10),
  green: createCanvasIcon(10),
  blue: createCanvasIcon(10),
  red: createCanvasIcon(10),
  purple: createCanvasIcon(10),
};
