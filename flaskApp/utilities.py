import torch
import torch.nn as nn

class CustomLinearRegression(nn.Module):
    def __init__(self):
        super(CustomLinearRegression, self).__init__()
        self.linear = nn.Linear(1, 1)

    def forward(self, x):
        return self.linear(x)

# Define the prediction function
def prediction(x):
    try:
        x_tensor = torch.Tensor([x])
        model = CustomLinearRegression()
        model.load_state_dict(torch.load('./models/model.pth'))
        model.eval()
        
        result = model(x_tensor).item()
        return {'result': result}
    except Exception as e:
        return {'error': str(e)}