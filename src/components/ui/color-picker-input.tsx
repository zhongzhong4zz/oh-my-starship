import * as React from 'react';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './dropdown-menu';

interface ColorPickerInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

// 从字符串中提取 hex 颜色
function extractHexColor(value: string): string | null {
    const match = value.match(/#([0-9A-Fa-f]{6})/);
    return match ? `#${match[1].toUpperCase()}` : null;
}

// 将 hex 颜色应用到字符串（替换或追加）
function applyHexColor(value: string, newColor: string): string {
    const hasHex = /#[0-9A-Fa-f]{6}/i.test(value);
    if (hasHex) {
        return value.replace(/#[0-9A-Fa-f]{6}/i, newColor);
    }
    // 如果没有颜色，在括号内追加
    const styleMatch = value.match(/\(([^)]*)\)/);
    if (styleMatch) {
        return value.replace(/\([^)]*\)/, `(${newColor})`);
    }
    return value;
}

const ColorPickerInput = React.forwardRef<HTMLInputElement, ColorPickerInputProps>(
    ({ className, value, onChange, disabled, ...props }, ref) => {
        const [open, setOpen] = React.useState(false);
        const [customColor, setCustomColor] = React.useState('#000000');

        const currentColor = extractHexColor(value) || '#98C379';

        const handleColorSelect = (color: string) => {
            onChange(applyHexColor(value, color));
        };

        const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const color = e.target.value;
            setCustomColor(color);
            handleColorSelect(color);
        };

        return (
            <div className="relative flex items-center gap-2">
                <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={cn('pr-10 font-nerd', className)}
                    {...props}
                />
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild disabled={disabled}>
                        <button
                            type="button"
                            className={cn(
                                'absolute right-1 flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                disabled && 'pointer-events-none'
                            )}
                            disabled={disabled}
                        >
                            <div
                                className="h-5 w-5 rounded border border-border shadow-sm"
                                style={{ backgroundColor: currentColor }}
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-3" sideOffset={8}>
                        <div className="space-y-3">
                            <div className="mb-2 text-xs font-medium text-muted-foreground">
                                自定义颜色 (Hex)
                            </div>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={customColor}
                                    onChange={handleColorPickerChange}
                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                                <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm">
                                    <Palette className="h-4 w-4 text-muted-foreground" />
                                    <span className="flex-1 text-muted-foreground">选择颜色...</span>
                                    <div
                                        className="h-5 w-5 rounded border border-border"
                                        style={{ backgroundColor: customColor }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    value={customColor}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                            setCustomColor(val);
                                            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                                                handleColorSelect(val);
                                            }
                                        }
                                    }}
                                    placeholder="#RRGGBB"
                                    className="h-8 font-mono text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
                                            handleColorSelect(customColor);
                                            setOpen(false);
                                        }
                                    }}
                                    className="h-8 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    应用
                                </button>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }
);
ColorPickerInput.displayName = 'ColorPickerInput';

export { ColorPickerInput };
