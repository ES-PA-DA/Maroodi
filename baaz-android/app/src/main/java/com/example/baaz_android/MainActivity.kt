package com.example.baaz_android

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.baaz_android.network.MaroodiInstance
import com.example.baaz_android.network.ResponseMessage
import com.example.baaz_android.ui.theme.BaazandroidTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BaazandroidTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Greeting(
                        name = "Android",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
        getMessage()
    }

    private fun getMessage() {
        MaroodiInstance.apiInterface.getMessage().enqueue(object: Callback<ResponseMessage?>{
            override fun onResponse(
                call: Call<ResponseMessage?>,
                response: Response<ResponseMessage?>
            ) {
                val response = response.body()
                Toast.makeText(this@MainActivity, "Server message: "+response?.message, Toast.LENGTH_LONG).show()
            }

            override fun onFailure(call: Call<ResponseMessage?>, t: Throwable) {
                print(t.localizedMessage)
                Toast.makeText(this@MainActivity, t.localizedMessage, Toast.LENGTH_SHORT).show()
            }
        })
    }
}



@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    BaazandroidTheme {
        Greeting("Android")
    }
}