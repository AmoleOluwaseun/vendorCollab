/**
 * vendor-onboarding.js
 * Handles multi-step form navigation, validation, and refined preview generation.
 */

$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = 6;
    let templateHtml = "";

    // Load the official template
    $.get('document_templates/vendor_onboarding_form.html', function(data) {
        templateHtml = data;
    });

    // Show step 1 by default
    showStep(currentStep);

    // Next button click
    $('.btn-next').on('click', function() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                window.scrollTo(0, 0);
            }
        }
    });

    // Previous button click
    $('.btn-prev').on('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            window.scrollTo(0, 0);
        }
    });

    // Preview button click
    $('#btn-preview').on('click', function() {
        generateRefinedPreview();
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
            if (!$(this).val() && $(this).attr('type') !== 'checkbox') {
                $(this).addClass('is-invalid');
                isValid = false;
            } else if ($(this).attr('type') === 'checkbox' && !$(this).is(':checked')) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        return isValid;
    }

    function generateRefinedPreview() {
        if (!templateHtml) {
            alert("Template not loaded yet. Please try again in a moment.");
            return;
        }

        const formData = {};
        $('form#onboardingForm').serializeArray().forEach(item => {
            formData[item.name] = item.value;
        });

        // Create a temporary element to manipulate the template
        let $previewBody = $('<div>').html(templateHtml);

        // Replace basic text fields
        $previewBody.find('[data-field]').each(function() {
            const fieldName = $(this).data('field');
            if (formData[fieldName]) {
                $(this).text(formData[fieldName]);
            } else {
                $(this).html('&nbsp;'); // Keep the line if empty
            }
        });

        // Special handling for checkboxes/switches in the template
        if (formData.vendor_classification) {
            // Simplified check for now
        }

        $('#previewContent').html('<div class="onboarding-preview-container">' + $previewBody.html() + '</div>');
    }
});
