package com.example.baaz_android

import android.content.Context
import android.location.Address
import android.location.Geocoder
import android.os.Build
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.input.TextFieldState
import androidx.compose.foundation.text.input.rememberTextFieldState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SearchBar
import androidx.compose.material3.SearchBarDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.isTraversalGroup
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.traversalIndex
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.baaz_android.network.MaroodiInstance
import com.example.baaz_android.network.StoreItem
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.IOException
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SimpleSearchBar(
    textFieldState: TextFieldState,
    onSearch: (String) -> Unit,
    context: Context,
    searchResults: List<String>,
    modifier: Modifier = Modifier
) {
    // Controls expansion state of the search bar
    var expanded by rememberSaveable { mutableStateOf(false) }

    Box(
        modifier
            .fillMaxWidth()
            .semantics { isTraversalGroup = true }
    ) {
        SearchBar(
            modifier = Modifier
                .align(Alignment.TopCenter)
                .semantics { traversalIndex = 0f },
            inputField = {
                SearchBarDefaults.InputField(
                    query = textFieldState.text.toString(),
                    onQueryChange = { textFieldState.edit { replace(0, length, it) } },
                    onSearch = {
                        onSearch(textFieldState.text.toString())
                        expanded = false
                    },
                    expanded = expanded,
                    onExpandedChange = { expanded = it },
                    placeholder = { Text("Search") }
                )
            },
            expanded = expanded,
            onExpandedChange = { expanded = it },
        ) {
            // Display search results in a scrollable column
            Column(Modifier.verticalScroll(rememberScrollState())) {
                searchResults.forEach { result ->
                    ListItem(
                        headlineContent = { Text(result) },
                        modifier = Modifier
                            .clickable {
                                textFieldState.edit { replace(0, length, result) }
                                expanded = false
                            }
                            .fillMaxWidth()
                    )
                }
            }
        }
    }
}

@Composable
@Preview
fun StoreScreen() {


    val storeName = rememberTextFieldState()
    val textFieldState = rememberTextFieldState()
    val items = listOf(
        "Walmart", "El chilo UABC", "Calimax"
    )
    val filteredItems by remember {
        derivedStateOf {
            val searchText = textFieldState.text.toString()
            if (searchText.isEmpty()) {
                emptyList()
            } else {
                items.filter { it.contains(searchText, ignoreCase = true) }
            }
        }
    }
    val context = LocalContext.current

    Box(modifier = Modifier.fillMaxSize(), Alignment.Center) {

        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {


            SimpleSearchBar(
                context = context,
                textFieldState = textFieldState,
                onSearch = {
                    geocodeStoreAddress(textFieldState.text as String)
                },
                searchResults = filteredItems,
            )
            Box(modifier = Modifier.height(20.dp)) {}
            FilledTonalButton(onClick = {
                val store =
                    StoreItem(name = storeName.text as String, latitude = 0f, longitude = 0f)
                createStore(store)
            }, modifier = Modifier.fillMaxWidth()) {
                Text("Add store")
            }
        }
    }
}


fun createStore(store: StoreItem) {

    MaroodiInstance.apiInterface.postStore(store).enqueue(object : Callback<StoreItem> {
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


fun geocodeStoreAddress(storeAddress: String) {
    MaroodiInstance.apiInterface.postGeocodeStoreAddress(storeAddress).enqueue(object: Callback<List<StoreItem>>{
        override fun onResponse(
            call: Call<List<StoreItem>?>,
            response: Response<List<StoreItem>?>
        ) {
            TODO("Not yet implemented")
        }

        override fun onFailure(
            call: Call<List<StoreItem>?>,
            t: Throwable
        ) {
            TODO("Not yet implemented")
        }
    })
}