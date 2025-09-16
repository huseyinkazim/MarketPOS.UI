import React, { useCallback } from 'react'
import { Minus, Plus } from 'lucide-react'

interface QuantityInputProps {
  value: number
  step?: number
  min?: number
  max?: number
  onChange: (value: number) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  decimals?: number
  className?: string
}

const sizeClasses = {
  sm: {
    btn: 'h-8 w-8',
    input: 'h-8 text-sm'
  },
  md: {
    btn: 'h-10 w-10',
    input: 'h-10 text-base'
  },
  lg: {
    btn: 'h-12 w-12',
    input: 'h-12 text-lg'
  }
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  step = 0.1,
  min = 0,
  max,
  disabled,
  size = 'md',
  decimals = 3,
  className = ''
}) => {
  const cls = sizeClasses[size]

  const clamp = useCallback((v: number) => {
    if (v < min) return min
    if (typeof max === 'number' && v > max) return max
    return v
  }, [min, max])

  const format = (v: number) => parseFloat(v.toFixed(decimals))

  const changeBy = (delta: number) => {
    const next = clamp(format(value + delta))
    onChange(next)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '') {
      onChange(min)
      return
    }
    const num = Number(raw)
    if (!isNaN(num)) onChange(clamp(format(num)))
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); changeBy(step) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); changeBy(-step) }
  }

  return (
    <div className={`inline-flex items-center rounded-xl border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-400 overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => changeBy(-step)}
        className={`${cls.btn} flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKey}
        className={`${cls.input} w-24 text-center font-semibold outline-none border-l border-r border-gray-200 selection:bg-primary-100`}
      />
      <button
        type="button"
        disabled={disabled || (typeof max === 'number' && value >= max)}
        onClick={() => changeBy(step)}
        className={`${cls.btn} flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export default QuantityInput