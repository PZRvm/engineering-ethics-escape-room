import type { RoomDecor } from '../../../types/game'
import FurnitureDecor from './FurnitureDecor'
import ScreenDecor from './ScreenDecor'
import EquipmentDecor from './EquipmentDecor'

export { FurnitureDecor, ScreenDecor, EquipmentDecor }

const SCENE_WIDTH = 960
const SCENE_HEIGHT = 640

interface DecorRendererProps {
  decor: RoomDecor
}

export default function DecorRenderer({ decor }: DecorRendererProps) {
  const x = (decor.x / 100) * SCENE_WIDTH
  const y = (decor.y / 100) * SCENE_HEIGHT
  const width = (decor.width / 100) * SCENE_WIDTH
  const height = (decor.height / 100) * SCENE_HEIGHT

  const props = { x, y, width, height, decorId: decor.id }

  switch (decor.type) {
    case 'furniture':
      return <FurnitureDecor {...props} />
    case 'screen':
      return <ScreenDecor {...props} />
    case 'equipment':
      return <EquipmentDecor {...props} />
    case 'plant':
      // 暂无 plant 类型装饰物，fallback 到 equipment
      return <EquipmentDecor {...props} />
    default:
      return null
  }
}
