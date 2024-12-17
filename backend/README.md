## Deploying ML Model using Flask
This is a simple project to elaborate how to deploy a Machine Learning model using Flask API

### Prerequisites
You must have Scikit Learn, Pandas (for Machine Leraning Model) and Flask (for API) installed.

Flask version: 0.12.2
conda install flask=0.12.2  (or) pip install Flask==0.12.2

### Project Structure
This project has four major parts :
1. emotionClassifierModel.py - This contains code for our Machine Learning model to predict emotions based on training data related to text messages classified by emotions.
2. application.py - This contains Flask APIs that receives employee details through GUI or API calls, computes the precited value based on our model and returns it.

### Training the model
1. Ensure that you are in the project root directory. Create the machine learning model by running below command from command prompt -
```
python emotionClassifierModel.py
```
This would create a serialized version of our model into three files, model.pkl, vectorizer.pkl and label_encoder.pkl.

2. Run application.py using below command to start Flask API
```
python app.py
```
By default, flask will run on port 5000.

3. Use node.js in the frontend to view the webpage, and enter text as required for evaluation.

### Contributing and Bug Reporting

If you encounter any bugs, issues, or have suggestions for improvement, please feel free to:

1. **Open an issue**: Describe the problem, provide steps to reproduce it, and include any relevant screenshots or logs.
2. **Submit a pull request**:  
   - Fork the repository.  
   - Create a new branch for your fix or feature.  
   - Submit a pull request with a clear explanation of your changes.

We appreciate all contributions to improve this project!

