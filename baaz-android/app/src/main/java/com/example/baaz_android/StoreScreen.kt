package com.example.baaz_android

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.baaz_android.network.MaroodiInstance
import com.example.baaz_android.network.StoreItem
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
@Preview
fun StoreScreen(){


    val storeName = rememberTextFieldState()
        Box(modifier = Modifier.fillMaxSize(), Alignment.Center){
        Column(modifier= Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally){
            OutlinedTextField(label = {Text("Store Name")}, state = storeName, modifier = Modifier.fillMaxWidth())
            Box(modifier = Modifier.height(20.dp)){}
            FilledTonalButton(onClick = {
                val store = StoreItem(name = storeName.text as String, latitude = 0f, longitude = 0f)
                createStore(store)
            }, modifier = Modifier.fillMaxWidth()) {
                Text("Add store")
            }
        }
    }
}


fun createStore (store: StoreItem){

    MaroodiInstance.apiInterface.postStore(store).enqueue(object: Callback<StoreItem>{
        override fun onResponse(
            call: Call<StoreItem?>,
            response: Response<StoreItem?>
        ) {
            val response = response.body()
        }

        override fun onFailure(
            call: Call<StoreItem?>,
            t: Throwable
        ) {
            print(t.localizedMessage)
        }
    })

}