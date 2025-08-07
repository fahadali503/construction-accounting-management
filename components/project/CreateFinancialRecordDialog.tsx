'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreateFinancialRecord } from '@/hooks'
import { toast } from 'sonner'

interface CreateFinancialRecordDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    projectId: string
}

export function CreateFinancialRecordDialog({ open, onOpenChange, projectId }: CreateFinancialRecordDialogProps) {
    const [formData, setFormData] = useState({
        date: '',
        description: '',
        category: '',
        trade: '',
        unit: '',
        unitRatePrice: '',
        qty: ''
    })

    const createFinancialRecordMutation = useCreateFinancialRecord()

    // Calculate total amount automatically
    const totalAmount = (parseFloat(formData.unitRatePrice) || 0) * (parseFloat(formData.qty) || 0)

    useEffect(() => {
        if (open) {
            // Set default date to today
            setFormData(prev => ({
                ...prev,
                date: new Date().toISOString().split('T')[0]
            }))
        }
    }, [open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.category) {
            toast.error('Please select a category')
            return
        }

        try {
            const result = await createFinancialRecordMutation.mutateAsync({
                projectId,
                date: new Date(formData.date),
                description: formData.description,
                category: formData.category as 'Contractor' | 'Vendor' | 'Supplier',
                trade: formData.trade,
                unit: formData.unit,
                unitRatePrice: parseFloat(formData.unitRatePrice) || 0,
                qty: parseFloat(formData.qty) || 0,
                totalAmount
            })

            console.log('Financial record created successfully:', result)
            toast.success('Financial record created successfully!')

            // Reset form
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                category: '',
                trade: '',
                unit: '',
                unitRatePrice: '',
                qty: ''
            })

            // Close dialog
            onOpenChange(false)
        } catch (error) {
            console.error('Error creating financial record:', error)
            toast.error('Failed to create financial record')
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Financial Record</DialogTitle>
                        <DialogDescription>
                            Add a new financial record entry for this project.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Contractor">Contractor</SelectItem>
                                        <SelectItem value="Vendor">Vendor</SelectItem>
                                        <SelectItem value="Supplier">Supplier</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter description of the work or materials"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="trade">Trade</Label>
                                <Input
                                    id="trade"
                                    value={formData.trade}
                                    onChange={(e) => handleInputChange('trade', e.target.value)}
                                    placeholder="e.g., Electrical, Plumbing, Concrete"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    value={formData.unit}
                                    onChange={(e) => handleInputChange('unit', e.target.value)}
                                    placeholder="e.g., sq ft, bags, hours"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="unitRatePrice">Unit Rate Price</Label>
                                <Input
                                    id="unitRatePrice"
                                    type="number"
                                    step="0.01"
                                    value={formData.unitRatePrice}
                                    onChange={(e) => handleInputChange('unitRatePrice', e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="qty">Quantity</Label>
                                <Input
                                    id="qty"
                                    type="number"
                                    step="0.01"
                                    value={formData.qty}
                                    onChange={(e) => handleInputChange('qty', e.target.value)}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Total Amount</Label>
                                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm font-medium">
                                    Rs{totalAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createFinancialRecordMutation.isPending || !formData.description.trim() || !formData.category}
                        >
                            {createFinancialRecordMutation.isPending ? 'Creating...' : 'Create Record'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
