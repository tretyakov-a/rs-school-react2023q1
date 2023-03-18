export const imagesUrl = 'https://raw.githubusercontent.com/tretyakov-a/online-store/main/';

export const SPECS = [
  'height',
  'len',
  'material',
  'weight',
  'width',
  'equipment',
  'extra',
  'guarantee',
  'fpv',
  'cameraIncluded',
  'model',
  'color',
  'size',
  'type',
  'engineType',
  'gps',
  'autoLanding',
  'sdditionalFlightFeatures',
  'flightTrajectory',
  'flightDuration',
  'altitudePointHold',
  'batteryCapacity',
  'batteryNumber',
  'batteryVoltage',
  'batteryType',
  'mobileAttach',
  'tabletSupport',
  'compatibleOs',
  'mobileControl',
  'remoteControlDeviceIncluded',
  'controlRadius',
  'headlessMode',
  'remoteControlDeviceScreen',
  'remoteControlDeviceBattery',
  'propellerDiameter',
  'manufacturer',
  'manufacturerCode',
  'cameraResolution',
  'hdVideo',
  'memoryCardSupport',
  'maxHorizontalSpeed',
  'maxViewAngle',
  'videoMode',
  'maxAltitude',
  'suspensionIncluded',
  'maxVerticalSpeed',
  'memoryCardTypeAndCapacity',
];

export const PROPS = [
  'dimensions',
  'additionalInfo',
  'factoryData',
  'camera',
  'classification',
  'flightCharacteristics',
  'power',
  'mobileSupport',
  'remoteControlDevice',
  'photoAndVideo',
];

type PropKey = (typeof PROPS)[number];
type SpecKey = (typeof SPECS)[number];
export type ProductPropSpec = Partial<
  Record<
    SpecKey,
    {
      title: string;
      value: string;
    }
  >
>;

export type ProductProp = Partial<
  Record<
    PropKey,
    {
      title: string;
      specs: ProductPropSpec;
    }
  >
>;

export interface Product {
  id: string;
  imgs: string[];
  title: string;
  price: number;
  rating: number;
  year: number;
  brand: string;
  brandImage: string;
  description: string;
  props: ProductProp;
}

export type PropType = string | string[] | number | undefined;
export type PropPicker = (product: Product) => PropType;

export const PROP = {
  PRICE: 'price',
  RATING: 'rating',
  YEAR: 'year',
  BRAND: 'brand',
  BRAND_IMG: 'brandImage',
  IMGS: 'imgs',
  COLOR: 'color',
  WEIGHT: 'weight',
  MOBILE_CONTROL: 'mobileControl',
  CAMERA_INCLUDED: 'cameraIncluded',
  TITLE: 'title',
  SIZE: 'size',
} as const;

export type ProductKeyType = (typeof PROP)[keyof typeof PROP];
export type ProductProps = { [key in ProductKeyType]: PropType };

export const propPickers: Record<string, PropPicker> = {
  [PROP.PRICE]: (item): number => item.price,
  [PROP.RATING]: (item): number => item.rating,
  [PROP.YEAR]: (item): number => item.year,
  [PROP.BRAND]: (item) => item.brand,
  [PROP.BRAND_IMG]: (item) => item.brandImage,
  [PROP.IMGS]: (item): string[] => item.imgs,
  [PROP.COLOR]: (item) => item.props.classification?.specs.color?.value,
  [PROP.WEIGHT]: (item): number =>
    Number.parseFloat(item.props.dimensions?.specs.weight?.value || ''),
  [PROP.MOBILE_CONTROL]: (item) => item.props.mobileSupport?.specs.mobileControl?.value,
  [PROP.CAMERA_INCLUDED]: (item) => item.props.camera?.specs.cameraIncluded?.value,
  [PROP.TITLE]: (item): string => item.title,
  [PROP.SIZE]: (item) => item.props.classification?.specs.size?.value,
};

export function isEqualProductsArrays(a: Product[], b: Product[]): boolean {
  return (
    a.length === b.length &&
    a.every((aItem, i) => {
      return b[i].id === aItem.id;
    })
  );
}
