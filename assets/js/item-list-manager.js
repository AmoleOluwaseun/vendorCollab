/**
 * Item List Manager
 * Handles dynamic row addition, deletion, and calculations for RFQ/Proposal item tables.
 */
class ItemListManager {
    constructor(config) {
        this.tableId = config.tableId || 'item_list_table';
        this.tableBody = $(`#${this.tableId} tbody`);
        this.addRowBtn = $(config.addRowBtn || '#add_row');
        this.deleteRowBtn = $(config.deleteRowBtn || '#delete_row');
        this.totalField = $(config.totalField || '#total_amount');
        this.rowCount = 1; // Initial row count (assuming 1 row exists)

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateRowIndices();
    }

    bindEvents() {
        const self = this;

        // Add Row Button
        this.addRowBtn.on('click', function() {
            self.addRow();
        });

        // Delete Row Button
        this.deleteRowBtn.on('click', function() {
            self.deleteRow();
        });

        // Calculation Events (delegated)
        this.tableBody.on('keyup change', '.qty, .price', function() {
            const row = $(this).closest('tr');
            self.calculateRow(row);
            self.calculateTotal();
        });
    }

    addRow(data = null) {
        const rowId = `addr${this.rowCount}`;
        const newRow = `
            <tr id="${rowId}" class="item-row">
                <td class="row-index text-center align-middle">${this.rowCount + 1}</td>
                <td>
                    <input type="text" name="product[]" placeholder="Item Name" class="form-control fw-bold mb-1 product-name" value="${data ? data.name : ''}">
                    <textarea name="description[]" placeholder="Description/Specs" class="form-control fs-12 text-muted product-desc" rows="2">${data ? data.description || '' : ''}</textarea>
                </td>
                <td>
                    <select name="unit[]" class="form-control product-unit">
                        <option value="pcs" ${data && data.unit === 'pcs' ? 'selected' : ''}>Pcs</option>
                        <option value="kg" ${data && data.unit === 'kg' ? 'selected' : ''}>Kg</option>
                        <option value="tons" ${data && data.unit === 'tons' ? 'selected' : ''}>Tons</option>
                        <option value="ltr" ${data && data.unit === 'ltr' ? 'selected' : ''}>Ltr</option>
                        <option value="box" ${data && data.unit === 'box' ? 'selected' : ''}>Box</option>
                        <option value="set" ${data && data.unit === 'set' ? 'selected' : ''}>Set</option>
                    </select>
                </td>
                <td><input type="number" name="qty[]" placeholder="0" class="form-control qty" step="1" min="1" value="1"></td>
                <td><input type="number" name="price[]" placeholder="0.00" class="form-control price" step="0.01" value="${data ? data.price || '' : ''}"></td>
                <td><input type="number" name="total[]" placeholder="0.00" class="form-control total" readonly></td>
            </tr>
        `;

        this.tableBody.append(newRow);
        this.rowCount++;
        
        // Trigger calculation for new row if data provided
        if (data) {
            const addedRow = this.tableBody.find(`#${rowId}`);
            this.calculateRow(addedRow);
            this.calculateTotal();
        }
    }

    deleteRow() {
        if (this.rowCount > 1) {
            this.tableBody.find('tr:last').remove();
            this.rowCount--;
            this.calculateTotal();
        }
    }

    updateRowIndices() {
        const self = this;
        this.tableBody.find('tr').each(function(index) {
            $(this).find('.row-index').text(index + 1);
            $(this).attr('id', `addr${index}`);
        });
        this.rowCount = this.tableBody.find('tr').length;
    }

    calculateRow(row) {
        const qty = parseFloat(row.find('.qty').val()) || 0;
        const price = parseFloat(row.find('.price').val()) || 0;
        const total = qty * price;
        row.find('.total').val(total.toFixed(2));
    }

    calculateTotal() {
        let sum = 0;
        this.tableBody.find('.total').each(function() {
            sum += parseFloat($(this).val()) || 0;
        });
        this.totalField.val(sum.toFixed(2));
    }

    // Method to be called by external catalog modal
    addItemFromCatalog(itemData) {
        // Check if first row is empty, if so calculate total there, otherwise add new
        const firstRow = this.tableBody.find('tr:first');
        const firstRowName = firstRow.find('.product-name').val();
        
        if (this.rowCount === 1 && !firstRowName) {
            firstRow.find('.product-name').val(itemData.name);
            firstRow.find('.product-desc').val(itemData.description || '');
            firstRow.find('.price').val(itemData.price || '');
            // Unit selection logic if needed
            this.calculateRow(firstRow);
            this.calculateTotal();
        } else {
            this.addRow(itemData);
        }
    }
}
