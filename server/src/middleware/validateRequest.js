
// Validates body, query params, and route params

export default function validateRequest(schema) {
    return async (req, res, next) => {
      try {
        // Combine all request data into one object for validation
        const dataToValidate = {
          body: req.body,
          query: req.query,
          params: req.params
        };

        const validatedData = await schema.validateAsync(dataToValidate, {
          abortEarly: false,    //returns all validation errors, not just the first
          stripUnknown: true    //remove fields not defined in the schema
        });
  
        // Replace request data with only the validated/sanitized values
        req.body = validatedData.body || {};
        req.query = validatedData.query || {};
        req.params = validatedData.params || {};
  
        next();
      } catch (error) {

        // Handle validation errors
        const errors = error.details.map(detail => ({
          field: detail.context.key,              // Extract field name from error context
          message: detail.message.replace(/['"]+/g, '')     // Clean up error message by removing Joi's quotes
        }));
  
        // Send back an error response
        res.status(422).json({
          status: 'error',
          message: 'Validation failed',
          errors // Array of specific errors
        });
      }
    };
  };
