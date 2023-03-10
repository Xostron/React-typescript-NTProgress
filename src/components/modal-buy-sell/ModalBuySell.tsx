import style from './ModalBuySell.module.scss'
import React, { FC, useState, useContext } from 'react'
import { IArchive, IInputText, ITicker } from '../../types/types'
import { HandySvg } from 'handy-svg'
import iClose from '../../source/icons/bx-x.svg'
import { InputText } from '../UI/input/input-text/InputText'
import { BtnText } from '../UI/button/btn-text/BtnText'
import { ArchiveContext } from '../../context/ArchiveContext'


interface IPropsModalBS {
    props: ITicker
    onClose?: (val: boolean) => void
}

// модальное окно - Форма покупки/продажи валюты
export const ModalBuySell: FC<IPropsModalBS> = ({ props, onClose }) => {

    // контекст - архивные данные об операция с валютой
    const { archive, setArchive } = useContext(ArchiveContext)
    // количество валюты на покупку/продажу
    const [volume, setVolume] = useState<string>('')
    // событие поля ввода - кол-ва валюты
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.value)
    }
    // событие кнопки ОК 
    const handlerOK = () => {
        let data: IArchive = {
            side: props.side,
            price: props.price,
            instrument: props.instrument,
            volume: volume,
            timestamp: new Date().toLocaleString()
        }
        setArchive([...archive, data])
        setVolume('')
        onClose?.(false)
    }
    // кнопка отмены операции купли/продажи валюты
    const handlerCancel = () => {
        setVolume('')
        onClose?.(false)
    }
    // свойства для компонента Input
    const inputProps: IInputText = {
        name: 'volume',
        changeHandler: changeHandler,
        value: volume
    }
    // console.log(archive)
    return (
        <div className={style.container}>

            <div className={style.wrapper}>
                <div className={style.header} >
                    <span>Make order</span>
                    <span onClick={handlerCancel}>
                        <HandySvg
                            color={props.side}
                            className={style.iconClose}
                            src={iClose}
                        />
                    </span>
                </div>
            </div>

            <hr color={props.side} />

            <div className={style.wrapper}>

                <div className={style.info}>
                    <span color={props.side}> {props.side}</span>
                    <span>{props.price}</span>
                    <span>{props.instrument}</span>
                </div>

                <div className={style.customInput}>
                    <span>Volume:</span>
                    <InputText props={inputProps} />
                </div>

                <div className={style.buttons}>
                    <BtnText color={'gray'} onClick={handlerCancel}>Cancel</BtnText>
                    <BtnText onClick={handlerOK}>OK</BtnText>
                </div>

            </div>
        </div >
    )
}