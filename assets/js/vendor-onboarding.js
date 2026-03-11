/**
 * vendor-onboarding.js
 * Handles multi-step form navigation, validation, and preview generation.
 */

$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = 6;

    // Show step 1 by default
    showStep(currentStep);

    // Next button click
    $('.btn-next').on('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    // Previous button click
    $('.btn-prev').on('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Preview button click
    $('#btn-preview').on('click', function() {
        generatePreview();
        $('#previewModal').modal('show');
    });

    function showStep(step) {
        $('.wizard-step').hide();
        $(`.wizard-step[data-step="${step}"]`).fadeIn();
        
        // Update progress bar
        const progress = ((step - 1) / (totalSteps - 1)) * 100;
        $('.progress-bar').css('width', `${progress}%`);

        // Update step titles
        $('.step-indicator').removeClass('active');
        $(`.step-indicator[data-step="${step}"]`).addClass('active');

        // Toggle buttons
        if (step === 1) {
            $('.btn-prev').hide();
        } else {
            $('.btn-prev').show();
        }

        if (step === totalSteps) {
            $('.btn-next').hide();
            $('.btn-submit-final').show();
            $('#btn-preview').show();
        } else {
            $('.btn-next').show();
            $('.btn-submit-final').hide();
            $('#btn-preview').hide();
        }
    }

    function validateStep(step) {
        let isValid = true;
        const currentStepEl = $(`.wizard-step[data-step="${step}"]`);
        
        currentStepEl.find('input[required], select[required], textarea[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (!isValid) {
            // Optional: Show alert or scroll to first error
            console.log('Validation failed for step ' + step);
        }

        return isValid;
    }

    function generatePreview() {
        const formData = {};
        $('form#onboardingForm').serializeArray().forEach(item => {
            formData[item.name] = item.value;
        });

        let previewHtml = `
            <div class="onboarding-preview-container">
                <div class="preview-header">
                    <h1>NSP VENDOR ONBOARDING FORM</h1>
                    <p>OFFICIAL REGISTRATION DOCUMENT</p>
                </div>

                <div class="preview-section">
                    <div class="preview-section-title">PART 1: Company Profile</div>
                    <div class="preview-grid">
                        <div class="preview-item">
                            <span class="preview-label">Company Name</span>
                            <span class="preview-value">${formData.company_name || ''}</span>
                        </div>
                        <div class="preview-item">
                            <span class="preview-label">Contact Person</span>
                            <span class="preview-value">${formData.contact_person || ''}</span>
                        </div>
                        <div class="preview-item">
                            <span class="preview-label">Email Address</span>
                            <span class="preview-value">${formData.email || ''}</span>
                        </div>
                        <div class="preview-item">
                            <span class="preview-label">TIN</span>
                            <span class="preview-value">${formData.tin || ''}</span>
                        </div>
                    </div>
                </div>

                <div class="preview-section">
                    <div class="preview-section-title">PART 2: Directorate & Executive Management</div>
                    <div class="preview-item">
                        <span class="preview-label">Shareholders</span>
                        <span class="preview-value">${formData.shareholders || 'N/A'}</span>
                    </div>
                </div>

                <div class="preview-section">
                    <div class="preview-section-title">PART 3: Company Product/Services</div>
                    <div class="preview-item">
                        <span class="preview-label">Classification</span>
                        <span class="preview-value">${formData.vendor_classification || ''}</span>
                    </div>
                </div>

                <div class="preview-section">
                    <div class="preview-section-title">Acknowledgement</div>
                    <p>I confirmed that I have read and understood the Code of Conduct.</p>
                    <div class="preview-grid">
                        <div class="preview-item">
                            <span class="preview-label">Authorized Representative</span>
                            <span class="preview-value">${formData.representative_name || ''}</span>
                        </div>
                        <div class="preview-item">
                            <span class="preview-label">Date</span>
                            <span class="preview-value">${new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#previewContent').html(previewHtml);
    }
});
