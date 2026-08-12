package com.example.baaz_android

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.requiredSize
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
@Preview
fun StoreScreen(){
    Box(modifier = Modifier.fillMaxSize(), Alignment.Center){
        Column(modifier= Modifier.padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally){
            OutlinedTextField(label = {Text("Store Name")}, state = rememberTextFieldState(), modifier = Modifier.fillMaxWidth())
            Box(modifier = Modifier.height(20.dp)){}
            FilledTonalButton(onClick = {}, modifier = Modifier.fillMaxWidth()) {
                Text("Add store")
            }
        }
    }
}