import { style } from '@angular/animations';

export const viewTransitionConfig = '1s ease-in-out'
export const workTransitionConfig = '1s ease-in-out'

export const onScreenYStyle = style({ transform: 'translateY(0)' })
export const aboveScreenStyle = style({ transform: 'translateY(-100%)' })
export const belowScreenStyle = style({ transform: 'translateY(100%)' })
export const onScreenXStyle = style({ 
	transform: 'translateX(0)'
	 })
export const leftOfScreenStyle = style({ transform: 'translateX(-100%)' })
export const rightOfScreenStyle = style({ transform: 'translateX(100%)' })

export const gridWorkStyle = style({ height: '25%', width: '25%' })
export const activeWorkStyle = style({ height: '80%', width: '80%' })
export const rowWorkStyle = style({ height: '10%', width: '10%' })