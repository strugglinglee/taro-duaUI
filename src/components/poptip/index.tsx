/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

interface Props {
    text: string
    children?: JSX.Element | false | null | string | (JSX.Element | false | null | string)[]
    placement: 'top' | 'bottom' | 'left' | 'right' // 方向
    customStyle?: React.CSSProperties | string
    disabled?: boolean // 是否禁用
    needAnimation?: boolean // 是否需要动画
    maxWidth?: number
    isReverse?: boolean // 页面是否翻转
    className?: string
}

export default function PopTip(props: Props) {
    const { placement, text, children, customStyle, needAnimation, maxWidth, disabled, isReverse } = props

    const [tipHeight, setTipHeight] = useState<number | string>(0)
    const [tipWidth, setTipWidth] = useState<number | string>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const poptipRef = useRef<any>(null)

    useEffect(() => {
        setLoading(true)
        Taro.nextTick(() => {
            initClientInfo(true)
        })
    }, [text, maxWidth, disabled])

    const initClientInfo = (needDelay: boolean) => {
        console.log(poptipRef,Taro, 'poptipRef')
        // 处理未找到dom的情况 重新查找
        if (needDelay) {
            setTimeout(() => {
                initClientInfo(false)
            }, 500)
            return
        }
        // h5
        if (Taro.getEnv()==='WEB' && poptipRef.current) {
            const { clientHeight } = poptipRef.current
            setTipHeight(`${clientHeight}px`)
            setTipWidth(transMaxWidth)
            setLoading(false)
            // 小程序
        } else if (poptipRef?.current?.uid) {
            const { uid } = poptipRef.current
            // 拿dom数据
            Taro.createSelectorQuery()
                .select(`#${uid}`)
                .boundingClientRect(rect => {
                    console.log('----dom info----', rect, poptipRef.current)
                    if (rect) {
                        setTipHeight(isReverse ? `${rect.width}px` : `${rect.height}px`)
                        setTipWidth(transMaxWidth)
                    }
                    setLoading(false)
                })
                .exec()
        }
    }

    const transMaxWidth = useMemo(() => Taro.pxTransform(maxWidth || PopTip.defaultProps.maxWidth), [maxWidth])

    const tipStyle = useMemo(() => {
        const styles = {
            top: { top: `-${tipHeight}` },
            bottom: { bottom: `-${tipHeight}` },
            left: { left: `-${tipWidth}` },
            right: { right: `-${tipWidth}` }
        }
        const style = styles[placement] || {}
        return {
            ...style,
            width: transMaxWidth,
            opacity: loading ? '0' : '1'
        }
    }, [tipHeight, tipWidth, placement, transMaxWidth, loading])

    const tipClassName = useMemo(() => `tip tip_${placement}${needAnimation ? ` tip_${placement}_animation` : ''}`, [
        placement,
        needAnimation
    ])
    return (
        <View className={classnames('wrapper',props.className)}  style={customStyle}>
            {children}
            {disabled ? null : (
                <View ref={poptipRef} className={tipClassName} style={tipStyle}>
                    <View className='tip_inner'>{text}</View>
                    <View className='tip_triangle' />
                </View>
            )}
        </View>
    )
}

PopTip.defaultProps = {
    text: '',
    placement: 'top',
    disabled: false,
    needAnimation: true,
    maxWidth: 250,
    isReverse: false,
    className: ''
}
